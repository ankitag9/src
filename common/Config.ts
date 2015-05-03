///<reference path='../_references.d.ts'/>
import nconf        = require("nconf");

class Config
{
    static PORT:string                                  = 'port';
    static DATABASE_HOST:string                         = 'database.host';
    static DATABASE_NAME:string                         = 'database.name';
    static DATABASE_USER:string                         = 'database.user';
    static DATABASE_PASS:string                         = 'database.pass';
    static REF_DATABASE_NAME:string                     = 'ref.database.name';
    static DATABASE_SOCKET:string                       = 'database.socket';
    static UPLOAD_PATH:string                           = 'upload.path';
    static ADMIN_EMAIL:string                           = 'admin.email';
    static PASSWORD_SEED_LENGTH:string                  = 'password_seed.length';
    static DEFAULT_PASSWORD_LENGTH:string               = 'default.password.length';
    static REDIS_HOST:string                            = 'redis.host';
    static REDIS_SESSION_PORT:string                    = 'redis.session.port';
    static SESSION_EXPIRY:string                        = 'session.expiry';

    private static ctor = (() =>
    {
        nconf.file({file: "/var/bbn/config/config.json"});
    })();

    /* Getters */
    static get(key:string):any
    {
        return nconf.get(key);
    }

}
export = Config