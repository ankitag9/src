///<reference path='../_references.d.ts'/>
import Coral                                = require('Coral');
import q                                    = require('q');
import express                              = require('express');
import _                                    = require('underscore');
import ApiUrlDelegate                       = require('../delegates/ApiUrlDelegate');
import UserDelegate                         = require('../delegates/UserDelegate');
import UserProfileDelegate                  = require('../delegates/UserProfileDelegate');
import User                                 = require('../models/User');
import UserProfile                          = require('../models/UserProfile');
import Config                               = require('../common/Config');
import ApiConstants                         = require('../enums/ApiConstants');

class UserApi
{
    constructor(app)
    {
        var userDelegate = new UserDelegate();
        var userProfileDelegate = new UserProfileDelegate();

        /* Create user */
        app.put(ApiUrlDelegate.user(), function (req:express.Request, res:express.Response)
        {
            var user:User = req.body[ApiConstants.USER];

            if (!Coral.Utils.isNullOrEmpty(user) && user.isValid())
                userDelegate.create(user)
                    .then(
                    function userCreated(user:User) { res.json(user); },
                    function userCreateError(err) { res.status(500).json(err); }
                );
            else
                res.status(500).json('Invalid data');
        });

        /* Update settings */
        app.post(ApiUrlDelegate.userById(), function (req, res:express.Response)
        {
            var userId:string = req.params[ApiConstants.USER_ID];
            var user:User = req.body[ApiConstants.USER];
            var userProfile:UserProfile = req.body[ApiConstants.USER_PROFILE];

            var password:string = req.body[ApiConstants.PASSWORD];
            var oldPassword:string = req.body[ApiConstants.OLD_PASSWORD];

            //if password exists then we are not updating any other fields
            if (!Coral.Utils.isNullOrEmpty(password) && !Coral.Utils.isNullOrEmpty(oldPassword))
            {
                var hashedPassword:string = user.getPasswordHash(user.getEmail(), oldPassword, user.getPasswordSeed());
                if (hashedPassword != user.getPassword())
                    res.send('Error in changing password. Old Password did not match').status(412);
                else
                    userDelegate.update({id: userId}, {password: password})
                        .then(
                        function passwordUpdated() { res.send('Password Changed Successfully').status(200); },
                        function PasswordUpdateError(error) { res.send('Password Change Failed. Internal Server Error').status(500); }
                    )
            }
            else
            {
                userDelegate.update({'id': userId}, user)
                    .then(
                    function userUpdated(result):any
                    {
                        if (userProfile)
                            return userProfileDelegate.update({'user_id': userId}, userProfile);
                        else
                            return res.json(result);
                    })
                    .then(
                    function userProfileUpdated(result)
                    {
                        return userDelegate.get(userId);
                    })
                    .then(
                    function userFetched(user)
                    {
                        req.logIn(user, function loggedInUserUpdated() {
                            res.send(user);
                        });
                    },
                    function updateFailed(err)
                    {
                        res.json(500, err);
                    });
            }
        });
    }
}
export = UserApi