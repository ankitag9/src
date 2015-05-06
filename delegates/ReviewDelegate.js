var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Coral = require('Coral');

var Review = require('../models/Review');

var ReviewDelegate = (function (_super) {
    __extends(ReviewDelegate, _super);
    function ReviewDelegate() {
        _super.call(this, Review);
    }
    return ReviewDelegate;
})(Coral.BaseDaoDelegate);
module.exports = ReviewDelegate;
//# sourceMappingURL=ReviewDelegate.js.map
