var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../_references.d.ts'/>
var Coral = require('Coral');

var Config = require('../common/Config');
var User = require('../models/User');

var UserDelegate = (function (_super) {
    __extends(UserDelegate, _super);
    function UserDelegate() {
        _super.call(this, User);
        this.mysqlDelegate = new Coral.MysqlDelegate();
    }
    UserDelegate.prototype.create = function (object, dbTransaction) {
        var self = this;

        if (Coral.Utils.isNullOrEmpty(dbTransaction))
            return self.mysqlDelegate.executeInTransaction(self, arguments);

        if (!Coral.Utils.isNullOrEmpty(object)) {
            object = new User(object);

            if (Coral.Utils.isNullOrEmpty(object[User.COL_PASSWORD]))
                object.setPassword(Coral.Utils.getRandomString(Config.get(Config.DEFAULT_PASSWORD_LENGTH)).toLowerCase() + Math.round(Math.random() * 1000));

            console.log(object.getPassword()); //TODO -  save in redis and send in email
            var newSeed = Coral.Utils.getRandomString(Config.get(Config.PASSWORD_SEED_LENGTH));
            object.setPasswordSeed(newSeed);
            object.setPassword(object.getPasswordHash());
        }

        return _super.prototype.create.call(this, object, dbTransaction);
    };

    UserDelegate.prototype.update = function (criteria, newValues, transaction) {
        var superUpdate = _super.prototype.update.bind(this);
        delete newValues[User.COL_ID];
        delete newValues[User.COL_EMAIL];

        if (newValues.hasOwnProperty(User.COL_PASSWORD) && !Coral.Utils.isNullOrEmpty(newValues[User.COL_PASSWORD])) {
            return this.find(criteria).then(function userFetched(user) {
                var newSeed = Coral.Utils.getRandomString(Config.get(Config.PASSWORD_SEED_LENGTH));
                user.setPassword(user.getPasswordHash(user.getEmail(), newValues[User.COL_PASSWORD], newSeed));
                user.setPasswordSeed(newSeed);
                return superUpdate(criteria, user, transaction);
            });
        }

        return _super.prototype.update.call(this, criteria, newValues);
    };
    return UserDelegate;
})(Coral.BaseDaoDelegate);
module.exports = UserDelegate;
//# sourceMappingURL=UserDelegate.js.map
