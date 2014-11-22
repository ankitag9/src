///<reference path='../_references.d.ts'/>
import Coral                                                = require('Coral');
import cryptojs                                             = require('crypto-js');
import UserType                                             = require('../enums/UserType');

class User extends Coral.BaseModel
{
    static TABLE_NAME:string                    = 'user';

    static COL_USER_TYPE:string = 'user_type';
    static COL_TITLE:string = 'title';
    static COL_FIRST_NAME:string = 'first_name';
    static COL_LAST_NAME:string = 'last_name';
    static COL_DOB:string = 'dob';
    static COL_EMAIL:string = 'email';
    static COL_PASSWORD:string = 'password';
    static COL_PASSWORD_SEED:string = 'password_seed';
    static COL_EMAIL_VERIFIED:string = 'email_verified';
    static COL_ACTIVE:string = 'active';

    private user_type:UserType;
    private title:number;
    private first_name:string;
    private last_name:string;
    private dob:number;
    private email:string;
    private password:string;
    private password_seed:string;
    private email_verified:number;
    private active:number;

    static PUBLIC_FIELDS:string[] = [User.COL_ID, User.COL_TITLE, User.COL_FIRST_NAME, User.COL_LAST_NAME, User.COL_EMAIL,
        User.COL_DOB, User.COL_EMAIL_VERIFIED, User.COL_ACTIVE, User.COL_EMAIL_VERIFIED, User.COL_USER_TYPE];

    getUserType():UserType                      { return this.user_type; }
    getTitle():number                           { return this.title; }
    getFirstName():string                       { return this.first_name; }
    getLastName():string                        { return this.last_name; }
    getDob():number                             { return this.dob; }
    getEmail():string                           { return this.email; }
    getPassword():string                        { return this.password; }
    getPasswordSeed():string                    { return this.password_seed; }
    getEmailVerified():number                   { return this.email_verified; }
    getActive():number                          { return this.active; }

    setUserType(val:UserType)                   { this.user_type = val; }
    setTitle(val:number)                        { this.title = val; }
    setFirstName(val:string)                    { this.first_name = val; }
    setLastName(val:string)                     { this.last_name = val; }
    setDob(val:number)                          { this.dob = val; }
    setEmail(val:string)                        { this.email = val; }
    setPassword(val:string)                     { this.password = val; }
    setPasswordSeed(val:string)                 { this.password_seed = val; }
    setEmailVerified(val:number)                { this.email_verified = val; }
    setActive(val:number)                       { this.active = val; }

    getPasswordHash(email?:string, password?:string, passwordSeed?:string):string
    {
        return cryptojs.MD5((email || this.email) + ':' + (password || this.password) + (passwordSeed || this.password_seed || '')).toString();
    }
}
export = User