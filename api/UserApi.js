///<reference path='../_references.d.ts'/>
var Coral = require('Coral');

var ApiUrlDelegate = require('../delegates/ApiUrlDelegate');
var UserDelegate = require('../delegates/UserDelegate');
var UserProfileDelegate = require('../delegates/UserProfileDelegate');

var ApiConstants = require('../enums/ApiConstants');

var UserApi = (function () {
    function UserApi(app) {
        var userDelegate = new UserDelegate();
        var userProfileDelegate = new UserProfileDelegate();

        /* Create user */
        app.put(ApiUrlDelegate.user(), function (req, res) {
            var user = req.body[ApiConstants.USER];

            if (!Coral.Utils.isNullOrEmpty(user) && user.isValid())
                userDelegate.create(user).then(function userCreated(user) {
                    res.json(user);
                }, function userCreateError(err) {
                    res.status(500).json(err);
                });
            else
                res.status(500).json('Invalid data');
        });

        /* Update settings */
        app.post(ApiUrlDelegate.userById(), function (req, res) {
            var userId = req.params[ApiConstants.USER_ID];
            var user = req.body[ApiConstants.USER];
            var userProfile = req.body[ApiConstants.USER_PROFILE];

            var password = req.body[ApiConstants.PASSWORD];
            var oldPassword = req.body[ApiConstants.OLD_PASSWORD];

            //if password exists then we are not updating any other fields
            if (!Coral.Utils.isNullOrEmpty(password) && !Coral.Utils.isNullOrEmpty(oldPassword)) {
                var hashedPassword = user.getPasswordHash(user.getEmail(), oldPassword, user.getPasswordSeed());
                if (hashedPassword != user.getPassword())
                    res.send('Error in changing password. Old Password did not match').status(412);
                else
                    userDelegate.update({ id: userId }, { password: password }).then(function passwordUpdated() {
                        res.send('Password Changed Successfully').status(200);
                    }, function PasswordUpdateError(error) {
                        res.send('Password Change Failed. Internal Server Error').status(500);
                    });
            } else {
                userDelegate.update({ 'id': userId }, user).then(function userUpdated(result) {
                    if (userProfile)
                        return userProfileDelegate.update({ 'user_id': userId }, userProfile);
                    else
                        return res.json(result);
                }).then(function userProfileUpdated(result) {
                    return userDelegate.get(userId);
                }).then(function userFetched(user) {
                    req.logIn(user, function loggedInUserUpdated() {
                        res.send(user);
                    });
                }, function updateFailed(err) {
                    res.json(500, err);
                });
            }
        });
    }
    return UserApi;
})();
module.exports = UserApi;
//# sourceMappingURL=UserApi.js.map
