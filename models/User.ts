///<reference path='../_references.d.ts'/>
import Coral                                                = require('Coral');
import cryptojs                                             = require('crypto-js');
import UserType                                             = require('../enums/UserType');

class User extends Coral.BaseModel
{
    static TABLE_NAME:string                    = 'user';

    static COL_USER_TYPE:string = 'user_type';
    static COL_TITLE:string = 'title';
    static COL_NAME:string = 'name';
    static COL_DOB:string = 'dob';
    static COL_EMAIL:string = 'email';
    static COL_PASSWORD:string = 'password';
    static COL_PASSWORD_SEED:string = 'password_seed';
    static COL_EMAIL_VERIFIED:string = 'email_verified';
    static COL_ACTIVE:string = 'active';
    static COL_SHORT_DESC:string = 'short_desc';
    static COL_LONG_DESC:string = 'long_desc';

    private user_type:UserType;
    private title:number;
    private name:string;
    private dob:number;
    private email:string;
    private password:string;
    private password_seed:string;
    private email_verified:number;
    private active:number;
    private short_desc:string;
    private long_desc:string;

    static PUBLIC_FIELDS:string[] = [User.COL_ID, User.COL_TITLE, User.COL_NAME, User.COL_EMAIL,
        User.COL_DOB, User.COL_EMAIL_VERIFIED, User.COL_ACTIVE, User.COL_EMAIL_VERIFIED, User.COL_USER_TYPE,
        User.COL_LONG_DESC, User.COL_SHORT_DESC];

    getUserType():UserType                      { return this.user_type; }
    getTitle():number                           { return this.title; }
    getName():string                            { return this.name; }
    getDob():number                             { return this.dob; }
    getEmail():string                           { return this.email; }
    getPassword():string                        { return this.password; }
    getPasswordSeed():string                    { return this.password_seed; }
    getEmailVerified():number                   { return this.email_verified; }
    getActive():number                          { return this.active; }
    getShortDesc():string                       { return this.short_desc; }
    getLongDesc():string                        { return this.long_desc; }

    setUserType(val:UserType)                   { this.user_type = val; }
    setTitle(val:number)                        { this.title = val; }
    setName(val:string)                         { this.name = val; }
    setDob(val:number)                          { this.dob = val; }
    setEmail(val:string)                        { this.email = val; }
    setPassword(val:string)                     { this.password = val; }
    setPasswordSeed(val:string)                 { this.password_seed = val; }
    setEmailVerified(val:number)                { this.email_verified = val; }
    setActive(val:number)                       { this.active = val; }
    setShortDesc(val:string)                    { this.short_desc = val; }
    setLongDesc(val:string)                     { this.long_desc = val; }

    getPasswordHash(email?:string, password?:string, passwordSeed?:string):string
    {
        return cryptojs.MD5((email || this.email) + ':' + (password || this.password) + (passwordSeed || this.password_seed || '')).toString();
    }
}
export = User