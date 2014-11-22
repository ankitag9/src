///<reference path='../_references.d.ts'/>
import Coral                                                = require('Coral');

class Review extends Coral.BaseModel
{
    static TABLE_NAME:string                    = 'review';

    static COL_USER_ID:string = 'user_id';
    static COL_BOOK_ID:string = 'book_id';
    static COL_RATING:string = 'rating';
    static COL_FEEDBACK:string = 'feedback';
    static COL_ACCEPTED_BY_ADMIN:string = 'accepted_by_admin';
    static COL_ACCEPTED_BY_AUTHOR:string = 'accepted_by_author';

    private user_id:number;
    private book_id:number;
    private rating:number;
    private feedback:string;
    private accepted_by_admin:number;
    private accepted_by_author:number;

    static PUBLIC_FIELDS:string[] = [Review.COL_ACCEPTED_BY_ADMIN, Review.COL_ACCEPTED_BY_AUTHOR, Review.COL_BOOK_ID, Review.COL_FEEDBACK,
        Review.COL_RATING, Review.COL_USER_ID, Review.COL_ID, Review.COL_CREATED, Review.COL_UPDATED];

    getUserId():number                     { return this.user_id; }
    getBookId():number                     { return this.book_id; }
    getRating():number                     { return this.rating; }
    getFeedback():string                   { return this.feedback; }
    getAcceptedByAdmin():number            { return this.accepted_by_admin; }
    getAcceptedByAuthor():number           { return this.accepted_by_author; }

    setUserId(val:number)                  { this.user_id = val; }
    setBookId(val:number)                  { this.book_id = val; }
    setRating(val:number)                  { this.rating = val; }
    setFeedback(val:string)                { this.feedback = val; }
    setAcceptedByAdmin(val:number)         { this.accepted_by_admin = val; }
    setAcceptedByAuthor(val:number)        { this.accepted_by_author = val; }
}
export = Review