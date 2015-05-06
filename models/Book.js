var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='../_references.d.ts'/>
var Coral = require('Coral');

var Book = (function (_super) {
    __extends(Book, _super);
    function Book() {
        _super.apply(this, arguments);
    }
    Book.prototype.getTitle = function () {
        return this.title;
    };
    Book.prototype.getUserId = function () {
        return this.user_id;
    };
    Book.prototype.getSummary = function () {
        return this.summary;
    };
    Book.prototype.getGenre = function () {
        return this.genre;
    };

    Book.prototype.setTitle = function (val) {
        this.title = val;
    };
    Book.prototype.setUserId = function (val) {
        this.user_id = val;
    };
    Book.prototype.setSummary = function (val) {
        this.summary = val;
    };
    Book.prototype.setGenre = function (val) {
        this.genre = val;
    };
    Book.TABLE_NAME = 'book';

    Book.COL_TITLE = 'title';
    Book.COL_USER_ID = 'user_id';
    Book.COL_SUMMARY = 'summary';
    Book.COL_GENRE = 'genre';

    Book.PUBLIC_FIELDS = [Book.COL_GENRE, Book.COL_SUMMARY, Book.COL_TITLE, Book.COL_USER_ID, Book.COL_ID, Book.COL_UPDATED, Book.COL_CREATED];
    return Book;
})(Coral.BaseModel);
module.exports = Book;
//# sourceMappingURL=Book.js.map
