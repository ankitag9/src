var Coral = require('Coral');

var log4js = require('log4js');

var passport = require('passport');
var UserDelegate = require('../delegates/UserDelegate');

var User = require('../models/User');

var AuthenticationDelegate = (function () {
    function AuthenticationDelegate() {
    }
    /* Check login method with support for ajax requests */
    AuthenticationDelegate.checkLogin = function (options) {
        if (typeof options === "undefined") { options = {}; }
        options.failureRedirect = options.failureRedirect; //TODO[ankit] || AuthenticationUrls.login();
        options.justCheck = options.justCheck || false;
        options.setReturnTo = options.setReturnTo || true;

        return function (req, res, next) {
            var isLoggedIn = req.isAuthenticated && req.isAuthenticated();
            if (isLoggedIn)
                next();
            else
                return res.json(401, { valid: isLoggedIn });
        };
    };

    /* Login method with support for ajax requests */
    AuthenticationDelegate.login = function (options) {
        if (typeof options === "undefined") { options = {}; }
        options.failureFlash = options.failureFlash || true;

        return function (req, res, next) {
            var isAjax = req.get('content-type') && req.get('content-type').indexOf('application/json') != -1;
            var user = new User(req.body);

            if (Coral.Utils.isNullOrEmpty(user.getEmail()) || Coral.Utils.isNullOrEmpty(user.getPassword())) {
                if (isAjax)
                    res.send(400, 'Please fill in all the details correctly');
                else {
                    if (options.failureFlash)
                        req.flash('error', 'Please fill in all the details correctly');
                    res.redirect(options.failureRedirect || req.originalUrl);
                }
            }

            var userDelegate = new UserDelegate();
            var findOptions = {};
            findOptions.fields = User.PUBLIC_FIELDS.concat([User.COL_PASSWORD, User.COL_PASSWORD_SEED]);

            userDelegate.find(Coral.Utils.createSimpleObject(User.COL_EMAIL, user.getEmail()), findOptions).then(function authComplete(matchingUser) {
                var reason;
                if (Coral.Utils.isNullOrEmpty(matchingUser))
                    reason = 'Invalid email';
                else {
                    user.setPasswordSeed(matchingUser.getPasswordSeed());
                    var hashedPassword = user.getPasswordHash();

                    if (hashedPassword != matchingUser.getPassword())
                        reason = 'Invalid password';
                }

                if (!Coral.Utils.isNullOrEmpty(reason)) {
                    if (isAjax)
                        res.send(500, reason);
                    else {
                        if (options.failureFlash)
                            req.flash('error', reason);
                        res.redirect(options.failureRedirect || req.originalUrl);
                    }
                } else
                    req.logIn(matchingUser, next);
            }).fail(function authFailed(error) {
                if (isAjax)
                    res.send(500, error.message);
                else {
                    if (options.failureFlash)
                        req.flash('error', error.message);
                    res.redirect(options.failureRedirect || req.originalUrl);
                }
            });
        };
    };
    AuthenticationDelegate.STRATEGY_OAUTH = 'oauth';
    AuthenticationDelegate.STRATEGY_FACEBOOK = 'facebook';

    AuthenticationDelegate.logger = log4js.getLogger('AuthenticationDelegate');

    AuthenticationDelegate.ctor = (function () {
        // Serialize-Deserialize user
        passport.serializeUser(function (user, done) {
            done(null, user);
        });
        passport.deserializeUser(function (obj, done) {
            done(null, obj);
        });
    })();
    return AuthenticationDelegate;
})();
module.exports = AuthenticationDelegate;
//# sourceMappingURL=AuthenticationDelegate.js.map
