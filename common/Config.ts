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