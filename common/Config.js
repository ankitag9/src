///<reference path='../_references.d.ts'/>
var nconf = require("nconf");

var Config = (function () {
    function Config() {
    }
    /* Getters */
    Config.get = function (key) {
        return nconf.get(key);
    };
    Config.PORT = 'port';
    Config.DATABASE_HOST = 'database.host';
    Config.DATABASE_NAME = 'database.name';
    Config.DATABASE_USER = 'database.user';
    Config.DATABASE_PASS = 'database.pass';
    Config.REF_DATABASE_NAME = 'ref.database.name';
    Config.DATABASE_SOCKET = 'database.socket';
    Config.UPLOAD_PATH = 'upload.path';
    Config.ADMIN_EMAIL = 'admin.email';
    Config.PASSWORD_SEED_LENGTH = 'password_seed.length';
    Config.DEFAULT_PASSWORD_LENGTH = 'default.password.length';
    Config.REDIS_HOST = 'redis.host';
    Config.REDIS_SESSION_PORT = 'redis.session.port';
    Config.SESSION_EXPIRY = 'session.expiry';

    Config.ctor = (function () {
        nconf.file({ file: "/var/bbn/config/config.json" });
    })();
    return Config;
})();
module.exports = Config;
//# sourceMappingURL=Config.js.map
