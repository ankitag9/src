var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Coral = require('Coral');

var ReviewComment = require('../models/ReviewComment');

var ReviewCommentDelegate = (function (_super) {
    __extends(ReviewCommentDelegate, _super);
    function ReviewCommentDelegate() {
        _super.call(this, ReviewComment);
    }
    return ReviewCommentDelegate;
})(Coral.BaseDaoDelegate);
module.exports = ReviewCommentDelegate;
//# sourceMappingURL=ReviewCommentDelegate.js.map
