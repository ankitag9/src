import Coral                                    = require('Coral');
import _                                        = require('underscore');
import http                                     = require('http');
import express                                  = require('express');
import url                                      = require('url');
import q                                        = require('q');
import log4js                                   = require('log4js');
import moment                                   = require('moment');
import passport                                 = require('passport');
import UserDelegate                             = require('../delegates/UserDelegate');
import ApiUrlDelegate                           = require('../delegates/ApiUrlDelegate');
import User                                     = require('../models/User');
import ApiConstants                             = require('../enums/ApiConstants');
import Config                                   = require('../common/Config');

class AuthenticationDelegate
{
    static STRATEGY_OAUTH:string = 'oauth';
    static STRATEGY_FACEBOOK:string = 'facebook';

    private static logger = log4js.getLogger('AuthenticationDelegate');

    /* Static constructor workaround */
    private static ctor = (() =>
    {
        // Serialize-Deserialize user
        passport.serializeUser(function (user, done) { done(null, user); });
        passport.deserializeUser(function (obj, done) { done(null, obj); });

    })();

    /* Check login method with support for ajax requests */
    static checkLogin(options:any = {})
    {
        options.failureRedirect = options.failureRedirect;//TODO[ankit] || AuthenticationUrls.login();
        options.justCheck = options.justCheck || false;
        options.setReturnTo = options.setReturnTo || true;

        return function (req, res:express.Response, next:Function):any
        {
            var isLoggedIn = req.isAuthenticated && req.isAuthenticated();
            if (isLoggedIn)
                    next();
            else
                return res.json(401, {valid: isLoggedIn});
        }
    }

    /* Login method with support for ajax requests */
    static login(options:any = {})
    {
        options.failureFlash = options.failureFlash || true;

        return function (req, res:express.Response, next:Function)
        {
            var isAjax = req.get('content-type') && req.get('content-type').indexOf('application/json') != -1;
            var user = new User(req.body);

            if (Coral.Utils.isNullOrEmpty(user.getEmail()) || Coral.Utils.isNullOrEmpty(user.getPassword()))
            {
                if (isAjax)
                    res.send(400, 'Please fill in all the details correctly');
                else
                {
                    if (options.failureFlash)
                        req.flash('error', 'Please fill in all the details correctly');
                    res.redirect(options.failureRedirect || req.originalUrl);
                }
            }

            var userDelegate = new UserDelegate();
            var findOptions:Coral.IDaoFetchOptions = {};
            findOptions.fields = User.PUBLIC_FIELDS.concat([User.COL_PASSWORD,User.COL_PASSWORD_SEED]);

            userDelegate.find(Coral.Utils.createSimpleObject(User.COL_EMAIL, user.getEmail()), findOptions)
                .then(
                function authComplete(matchingUser:User)
                {
                    var reason;
                    if (Coral.Utils.isNullOrEmpty(matchingUser))
                        reason = 'Invalid email';
                    else
                    {
                        user.setPasswordSeed(matchingUser.getPasswordSeed());
                        var hashedPassword = user.getPasswordHash();

                        if (hashedPassword != matchingUser.getPassword())
                            reason = 'Invalid password';
                    }

                    if (!Coral.Utils.isNullOrEmpty(reason))
                    {
                        if (isAjax)
                            res.send(500, reason);
                        else
                        {
                            if (options.failureFlash)
                                req.flash('error', reason);
                            res.redirect(options.failureRedirect || req.originalUrl);
                        }
                    }
                    else
                        req.logIn(matchingUser, next);
                })
                .fail(
                function authFailed(error)
                {
                    if (isAjax)
                        res.send(500, error.message);
                    else
                    {
                        if (options.failureFlash)
                            req.flash('error', error.message);
                        res.redirect(options.failureRedirect || req.originalUrl);
                    }
                });
        }
    }

}
export = AuthenticationDelegate