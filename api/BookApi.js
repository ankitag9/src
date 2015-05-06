var ApiUrlDelegate = require('../delegates/ApiUrlDelegate');
var BookDelegate = require('../delegates/BookDelegate');
var AuthenticationDelegate = require('../delegates/AuthenticationDelegate');
var ApiConstants = require('../enums/ApiConstants');

var BookApi = (function () {
    function BookApi(app) {
        var bookDelegate = new BookDelegate();

        app.get(ApiUrlDelegate.bookById(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var bookId = parseInt(req.params[ApiConstants.BOOK_ID]);

            bookDelegate.get(bookId).then(function profileFetched(profile) {
                res.json(profile);
            }, function profileFetchError(error) {
                res.status(500).send(error);
            });
        });

        app.get(ApiUrlDelegate.book(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var book = req.body[ApiConstants.BOOK];

            bookDelegate.search(book).then(function profileFetched(profile) {
                res.json(profile);
            }, function profileFetchError(error) {
                res.status(500).send(error);
            });
        });

        app.post(ApiUrlDelegate.bookById(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var book = req.body[ApiConstants.BOOK];
            var bookId = parseInt(req.params[ApiConstants.BOOK_ID]);

            bookDelegate.update({ id: bookId }, book).then(function profileUpdated(profile) {
                res.json(profile);
            }, function profileUpdateError(error) {
                res.status(500).send(error);
            });
        });

        app.put(ApiUrlDelegate.book(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var book = req.body[ApiConstants.BOOK];

            bookDelegate.create(book).then(function profileCreated(profile) {
                res.json(profile);
            }, function profileCreateError(error) {
                res.status(500).send(error);
            });
        });

        app.delete(ApiUrlDelegate.bookById(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var bookId = req.params[ApiConstants.BOOK_ID];

            bookDelegate.delete(bookId).then(function profileDeleted(profile) {
                res.json(profile);
            }, function profileDeleteError(error) {
                res.status(500).send(error);
            });
        });
    }
    return BookApi;
})();
module.exports = BookApi;
//# sourceMappingURL=BookApi.js.map
