var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Coral = require('Coral');

var BookLink = require('../models/BookLink');

var BookLinkDelegate = (function (_super) {
    __extends(BookLinkDelegate, _super);
    function BookLinkDelegate() {
        _super.call(this, BookLink);
    }
    return BookLinkDelegate;
})(Coral.BaseDaoDelegate);
module.exports = BookLinkDelegate;
//# sourceMappingURL=BookLinkDelegate.js.map
