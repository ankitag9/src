///<reference path='../_references.d.ts'/>
import Coral                                                            = require('Coral');
import q                                                                = require('q');
import Config                                                           = require('../common/Config');
import User                                                             = require('../models/User');
import ForeignKeyConstants                                              = require('../enums/ForeignKeyConstants');

class UserDelegate extends Coral.BaseDaoDelegate
{
    private mysqlDelegate = new Coral.MysqlDelegate();

    constructor() { super(User); }

    create(object:any, dbTransaction?:Object):q.Promise<any>
    {
        var self = this;

        if (Coral.Utils.isNullOrEmpty(dbTransaction))
            return self.mysqlDelegate.executeInTransaction(self, arguments);

        if (!Coral.Utils.isNullOrEmpty(object))
        {
            object = new User(object);

            if(Coral.Utils.isNullOrEmpty(object[User.COL_PASSWORD]))
                object.setPassword(Coral.Utils.getRandomString(Config.get(Config.DEFAULT_PASSWORD_LENGTH)).toLowerCase() + Math.round(Math.random()*1000));

            console.log(object.getPassword());//TODO -  save in redis and send in email
            var newSeed = Coral.Utils.getRandomString(Config.get(Config.PASSWORD_SEED_LENGTH));
            object.setPasswordSeed(newSeed);
            object.setPassword(object.getPasswordHash());
        }

        return super.create(object, dbTransaction);
    }

    update(criteria:Object, newValues:any, transaction?:Object):q.Promise<any>;
    update(criteria:number, newValues:any, transaction?:Object):q.Promise<any>;
    update(criteria:any, newValues:any, transaction?:Object):q.Promise<any>
    {
        var superUpdate = super.update.bind(this);
        delete newValues[User.COL_ID];
        delete newValues[User.COL_EMAIL];

        if (newValues.hasOwnProperty(User.COL_PASSWORD) && !Coral.Utils.isNullOrEmpty(newValues[User.COL_PASSWORD]))
        {
            return this.find(criteria)
                .then(
                function userFetched(user:User)
                {
                    var newSeed = Coral.Utils.getRandomString(Config.get(Config.PASSWORD_SEED_LENGTH));
                    user.setPassword(user.getPasswordHash(user.getEmail(), newValues[User.COL_PASSWORD], newSeed));
                    user.setPasswordSeed(newSeed);
                    return superUpdate(criteria, user, transaction);
                });
        }

        return super.update(criteria, newValues);
    }
}
export = UserDelegate