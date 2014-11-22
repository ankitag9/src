var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../_references.d.ts'/>
var Coral = require('Coral');
var cryptojs = require('crypto-js');

var User = (function (_super) {
    __extends(User, _super);
    function User() {
        _super.apply(this, arguments);
    }
    User.prototype.getUserType = function () {
        return this.user_type;
    };
    User.prototype.getTitle = function () {
        return this.title;
    };
    User.prototype.getFirstName = function () {
        return this.first_name;
    };
    User.prototype.getLastName = function () {
        return this.last_name;
    };
    User.prototype.getDob = function () {
        return this.dob;
    };
    User.prototype.getEmail = function () {
        return this.email;
    };
    User.prototype.getPassword = function () {
        return this.password;
    };
    User.prototype.getPasswordSeed = function () {
        return this.password_seed;
    };
    User.prototype.getEmailVerified = function () {
        return this.email_verified;
    };
    User.prototype.getActive = function () {
        return this.active;
    };

    User.prototype.setUserType = function (val) {
        this.user_type = val;
    };
    User.prototype.setTitle = function (val) {
        this.title = val;
    };
    User.prototype.setFirstName = function (val) {
        this.first_name = val;
    };
    User.prototype.setLastName = function (val) {
        this.last_name = val;
    };
    User.prototype.setDob = function (val) {
        this.dob = val;
    };
    User.prototype.setEmail = function (val) {
        this.email = val;
    };
    User.prototype.setPassword = function (val) {
        this.password = val;
    };
    User.prototype.setPasswordSeed = function (val) {
        this.password_seed = val;
    };
    User.prototype.setEmailVerified = function (val) {
        this.email_verified = val;
    };
    User.prototype.setActive = function (val) {
        this.active = val;
    };

    User.prototype.getPasswordHash = function (email, password, passwordSeed) {
        return cryptojs.MD5((email || this.email) + ':' + (password || this.password) + (passwordSeed || this.password_seed || '')).toString();
    };
    User.TABLE_NAME = 'user';

    User.COL_USER_TYPE = 'user_type';
    User.COL_TITLE = 'title';
    User.COL_FIRST_NAME = 'first_name';
    User.COL_LAST_NAME = 'last_name';
    User.COL_DOB = 'dob';
    User.COL_EMAIL = 'email';
    User.COL_PASSWORD = 'password';
    User.COL_PASSWORD_SEED = 'password_seed';
    User.COL_EMAIL_VERIFIED = 'email_verified';
    User.COL_ACTIVE = 'active';

    User.PUBLIC_FIELDS = [
        User.COL_ID, User.COL_TITLE, User.COL_FIRST_NAME, User.COL_LAST_NAME, User.COL_EMAIL,
        User.COL_DOB, User.COL_EMAIL_VERIFIED, User.COL_ACTIVE, User.COL_EMAIL_VERIFIED, User.COL_USER_TYPE];
    return User;
})(Coral.BaseModel);
module.exports = User;
//# sourceMappingURL=User.js.map
