///<reference path='../_references.d.ts'/>
import Coral                                                = require('Coral');
import q                                                    = require('q');
import ReviewStatus                                         = require('../enums/ReviewStatus');
import Book                                                 = require('../models/Book');
import ForeignKeyConstants                                  = require('../enums/ForeignKeyConstants');
import User                                                 = require('../models/User');

class Review extends Coral.BaseModel
{
    static TABLE_NAME:string                    = 'review';

    static COL_USER_ID:string = 'user_id';
    static COL_BOOK_ID:string = 'book_id';
    static COL_RATING:string = 'rating';
    static COL_FEEDBACK:string = 'feedback';
    static COL_STATUS:string = 'status';
    static COL_REVIEW:string = 'review';
    static COL_TITLE:string = 'title';

    private user_id:number;
    private book_id:number;
    private rating:number;
    private feedback:string;
    private review:string;
    private title:string;
    private status:ReviewStatus;

    static PUBLIC_FIELDS:string[] = [Review.COL_TITLE,Review.COL_REVIEW,Review.COL_STATUS, Review.COL_BOOK_ID, Review.COL_FEEDBACK,
        Review.COL_RATING, Review.COL_USER_ID, Review.COL_ID, Review.COL_CREATED, Review.COL_UPDATED];

    static FK_BOOK = new Coral.ForeignKey(Coral.ForeignKeyType.ONE_TO_ONE, Review.COL_BOOK_ID, Book, Book.COL_ID, ForeignKeyConstants.BOOK);
    static FK_USER = new Coral.ForeignKey(Coral.ForeignKeyType.ONE_TO_ONE, Review.COL_USER_ID, User, User.COL_ID, ForeignKeyConstants.USER);

    getUserId():number                     { return this.user_id; }
    getBookId():number                     { return this.book_id; }
    getRating():number                     { return this.rating; }
    getFeedback():string                   { return this.feedback; }
    getStatus():ReviewStatus               { return this.status; }
    getReview():string                     { return this.review; }
    getTitle():string                      { return this.title; }

    getBook():q.Promise<Book>              { return null; }
    getUser():q.Promise<User>              { return null; }

    setUserId(val:number)                  { this.user_id = val; }
    setBookId(val:number)                  { this.book_id = val; }
    setRating(val:number)                  { this.rating = val; }
    setFeedback(val:string)                { this.feedback = val; }
    setStatus(val:ReviewStatus)            { this.status = val; }
    setReview(val:string)                  { this.review = val; }
    setTitle(val:string)                   { this.title = val; }

    setBook(val:Book)                      {  }
    setUser(val:User)                      {  }
}
export = Review