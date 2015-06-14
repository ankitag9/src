var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../_references.d.ts'/>
var Coral = require('Coral');

var Book = require('../models/Book');
var ForeignKeyConstants = require('../enums/ForeignKeyConstants');
var User = require('../models/User');

var Review = (function (_super) {
    __extends(Review, _super);
    function Review() {
        _super.apply(this, arguments);
    }
    Review.prototype.getUserId = function () {
        return this.user_id;
    };
    Review.prototype.getBookId = function () {
        return this.book_id;
    };
    Review.prototype.getRating = function () {
        return this.rating;
    };
    Review.prototype.getFeedback = function () {
        return this.feedback;
    };
    Review.prototype.getStatus = function () {
        return this.status;
    };
    Review.prototype.getReview = function () {
        return this.review;
    };
    Review.prototype.getTitle = function () {
        return this.title;
    };

    Review.prototype.getBook = function () {
        return null;
    };
    Review.prototype.getUser = function () {
        return null;
    };

    Review.prototype.setUserId = function (val) {
        this.user_id = val;
    };
    Review.prototype.setBookId = function (val) {
        this.book_id = val;
    };
    Review.prototype.setRating = function (val) {
        this.rating = val;
    };
    Review.prototype.setFeedback = function (val) {
        this.feedback = val;
    };
    Review.prototype.setStatus = function (val) {
        this.status = val;
    };
    Review.prototype.setReview = function (val) {
        this.review = val;
    };
    Review.prototype.setTitle = function (val) {
        this.title = val;
    };

    Review.prototype.setBook = function (val) {
    };
    Review.prototype.setUser = function (val) {
    };
    Review.TABLE_NAME = 'review';

    Review.COL_USER_ID = 'user_id';
    Review.COL_BOOK_ID = 'book_id';
    Review.COL_RATING = 'rating';
    Review.COL_FEEDBACK = 'feedback';
    Review.COL_STATUS = 'status';
    Review.COL_REVIEW = 'review';
    Review.COL_TITLE = 'title';

    Review.PUBLIC_FIELDS = [
        Review.COL_TITLE, Review.COL_REVIEW, Review.COL_STATUS, Review.COL_BOOK_ID, Review.COL_FEEDBACK,
        Review.COL_RATING, Review.COL_USER_ID, Review.COL_ID, Review.COL_CREATED, Review.COL_UPDATED];

    Review.FK_BOOK = new Coral.ForeignKey(1 /* ONE_TO_ONE */, Review.COL_BOOK_ID, Book, Book.COL_ID, ForeignKeyConstants.BOOK);
    Review.FK_USER = new Coral.ForeignKey(1 /* ONE_TO_ONE */, Review.COL_USER_ID, User, User.COL_ID, ForeignKeyConstants.USER);
    return Review;
})(Coral.BaseModel);
module.exports = Review;
//# sourceMappingURL=Review.js.map
