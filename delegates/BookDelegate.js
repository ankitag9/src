var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Coral = require('Coral');

var Book = require('../models/Book');

var BookDelegate = (function (_super) {
    __extends(BookDelegate, _super);
    function BookDelegate() {
        _super.call(this, Book);
    }
    return BookDelegate;
})(Coral.BaseDaoDelegate);
module.exports = BookDelegate;
//# sourceMappingURL=BookDelegate.js.map
