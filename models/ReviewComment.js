var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../_references.d.ts'/>
var Coral = require('Coral');

var ReviewComment = (function (_super) {
    __extends(ReviewComment, _super);
    function ReviewComment() {
        _super.apply(this, arguments);
    }
    ReviewComment.prototype.getReviewId = function () {
        return this.review_id;
    };
    ReviewComment.prototype.getComment = function () {
        return this.comment;
    };
    ReviewComment.prototype.getUserId = function () {
        return this.user_id;
    };

    ReviewComment.prototype.setReviewId = function (val) {
        this.review_id = val;
    };
    ReviewComment.prototype.setComment = function (val) {
        this.comment = val;
    };
    ReviewComment.prototype.setUserId = function (val) {
        this.user_id = val;
    };
    ReviewComment.TABLE_NAME = 'review_comment';

    ReviewComment.COL_REVIEW_ID = 'review_id';
    ReviewComment.COL_COMMENT = 'comment';
    ReviewComment.COL_USER_ID = 'user_id';

    ReviewComment.PUBLIC_FIELDS = [ReviewComment.COL_COMMENT, ReviewComment.COL_REVIEW_ID, ReviewComment.COL_USER_ID, ReviewComment.COL_CREATED, ReviewComment.COL_UPDATED];
    return ReviewComment;
})(Coral.BaseModel);
module.exports = ReviewComment;
//# sourceMappingURL=ReviewComment.js.map
