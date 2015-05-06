var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../_references.d.ts'/>
var Coral = require('Coral');

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
    Review.prototype.getAcceptedByAdmin = function () {
        return this.accepted_by_admin;
    };
    Review.prototype.getAcceptedByAuthor = function () {
        return this.accepted_by_author;
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
    Review.prototype.setAcceptedByAdmin = function (val) {
        this.accepted_by_admin = val;
    };
    Review.prototype.setAcceptedByAuthor = function (val) {
        this.accepted_by_author = val;
    };
    Review.TABLE_NAME = 'review';

    Review.COL_USER_ID = 'user_id';
    Review.COL_BOOK_ID = 'book_id';
    Review.COL_RATING = 'rating';
    Review.COL_FEEDBACK = 'feedback';
    Review.COL_ACCEPTED_BY_ADMIN = 'accepted_by_admin';
    Review.COL_ACCEPTED_BY_AUTHOR = 'accepted_by_author';

    Review.PUBLIC_FIELDS = [
        Review.COL_ACCEPTED_BY_ADMIN, Review.COL_ACCEPTED_BY_AUTHOR, Review.COL_BOOK_ID, Review.COL_FEEDBACK,
        Review.COL_RATING, Review.COL_USER_ID, Review.COL_ID, Review.COL_CREATED, Review.COL_UPDATED];
    return Review;
})(Coral.BaseModel);
module.exports = Review;
//# sourceMappingURL=Review.js.map
