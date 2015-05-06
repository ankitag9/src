var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../_references.d.ts'/>
var Coral = require('Coral');

var BookLink = (function (_super) {
    __extends(BookLink, _super);
    function BookLink() {
        _super.apply(this, arguments);
    }
    BookLink.prototype.getBookId = function () {
        return this.book_id;
    };
    BookLink.prototype.getLink = function () {
        return this.link;
    };
    BookLink.prototype.getType = function () {
        return this.type;
    };

    BookLink.prototype.setBookId = function (val) {
        this.book_id = val;
    };
    BookLink.prototype.setLink = function (val) {
        this.link = val;
    };
    BookLink.prototype.setType = function (val) {
        this.type = val;
    };
    BookLink.TABLE_NAME = 'book_link';

    BookLink.COL_BOOK_ID = 'book_id';
    BookLink.COL_LINK = 'link';
    BookLink.COL_TYPE = 'type';

    BookLink.PUBLIC_FIELDS = [BookLink.COL_BOOK_ID, BookLink.COL_LINK, BookLink.COL_TYPE];
    return BookLink;
})(Coral.BaseModel);
module.exports = BookLink;
//# sourceMappingURL=BookLink.js.map
