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
    Config.EMAIL_CDN_BASE_URI = 'email.cdn.base_uri';

    Config.ctor = (function () {
        nconf.file({ file: "/var/bbn/config/config.json" });
    })();
    return Config;
})();
module.exports = Config;
//# sourceMappingURL=Config.js.map
