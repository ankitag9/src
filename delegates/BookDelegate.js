var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Coral = require('Coral');
var q = require('q');
var Book = require('../models/Book');
var Config = require('../common/Config');
var _ = require('underscore');

var BookDelegate = (function (_super) {
    __extends(BookDelegate, _super);
    function BookDelegate() {
        _super.call(this, Book);
        this.imageDelegate = new Coral.ImageDelegate();
    }
    BookDelegate.prototype.processBookImage = function (bookId, tempImagePath) {
        var self = this;
        var imageBasePath = Config.get(Config.UPLOAD_PATH) + bookId;
        var sizes = [500 /* LARGE */, 200 /* MEDIUM */, 50 /* SMALL */];

        return q.all(_.map(sizes, function (size) {
            return self.imageDelegate.resize(tempImagePath, imageBasePath + '_' + Coral.ImageSize[size].toLowerCase(), size);
        })).then(function imagesResized() {
            return self.imageDelegate.delete(tempImagePath);
        }).fail(function imageResizeFailed(error) {
            self.logger.debug('Image resize failed because %s', error.message);
        });
    };
    return BookDelegate;
})(Coral.BaseDaoDelegate);
module.exports = BookDelegate;
//# sourceMappingURL=BookDelegate.js.map
