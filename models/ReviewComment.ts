///<reference path='../_references.d.ts'/>
import Coral                                                = require('Coral');

class ReviewComment extends Coral.BaseModel
{
    static TABLE_NAME:string                    = 'review_comment';

    static COL_REVIEW_ID:string = 'review_id';
    static COL_COMMENT:string = 'comment';
    static COL_USER_ID:string = 'user_id';

    private review_id:number;
    private comment:string;
    private user_id:number;

    static PUBLIC_FIELDS:string[] = [ReviewComment.COL_COMMENT, ReviewComment.COL_REVIEW_ID, ReviewComment.COL_USER_ID, ReviewComment.COL_CREATED, ReviewComment.COL_UPDATED];

    getReviewId():number                        { return this.review_id; }
    getComment():string                         { return this.comment; }
    getUserId():number                          { return this.user_id; }

    setReviewId(val:number)                     { this.review_id = val; }
    setComment(val:string)                      { this.comment = val; }
    setUserId(val:number)                       { this.user_id = val; }
}
export = ReviewComment