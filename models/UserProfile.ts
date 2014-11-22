///<reference path='../_references.d.ts'/>
import Coral                                                = require('Coral');

class UserProfile extends Coral.BaseModel
{
    static TABLE_NAME:string                    = 'user_profile';

    static COL_USER_ID:string = 'user_id';
    static COL_SHORT_DESC:string = 'short_desc';
    static COL_LONG_DESC:string = 'long_desc';

    private user_id:number;
    private short_desc:string;
    private long_desc:string;

    static PUBLIC_FIELDS:string[] = [UserProfile.COL_LONG_DESC, UserProfile.COL_SHORT_DESC, UserProfile.COL_USER_ID];

    getUserId():number                          { return this.user_id; }
    getShortDesc():string                       { return this.short_desc; }
    getLongDesc():string                        { return this.long_desc; }

    setUserId(val:number)                       { this.user_id = val; }
    setShortDesc(val:string)                    { this.short_desc = val; }
    setLongDesc(val:string)                     { this.long_desc = val; }
}
export = UserProfile