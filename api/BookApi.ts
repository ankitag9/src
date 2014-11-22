import q                                                    = require('q');
import express                                              = require('express');
import passport                                             = require('passport');
import ApiUrlDelegate                                       = require('../delegates/ApiUrlDelegate');
import BookDelegate                                  = require('../delegates/BookDelegate');
import AuthenticationDelegate                               = require('../delegates/AuthenticationDelegate');
import ApiConstants                                         = require('../enums/ApiConstants');
import Book                                          = require('../models/Book');

class BookApi
{
    constructor(app)
    {
        var bookDelegate = new BookDelegate();

        app.get(ApiUrlDelegate.bookById(), AuthenticationDelegate.checkLogin(), function(req:express.Request, res:express.Response)
        {
            var bookId:number = parseInt(req.params[ApiConstants.BOOK_ID]);

            bookDelegate.get(bookId)
                .then(
                function profileFetched(profile) { res.json(profile); },
                function profileFetchError(error) { res.status(500).send(error); }
            );
        });

        app.get(ApiUrlDelegate.book(), AuthenticationDelegate.checkLogin(), function (req:express.Request, res:express.Response)
        {
            var book = req.body[ApiConstants.BOOK];

            bookDelegate.search(book)
                .then(
                function profileFetched(profile) { res.json(profile); },
                function profileFetchError(error) { res.status(500).send(error); }
            );
        });

        app.post(ApiUrlDelegate.bookById(), AuthenticationDelegate.checkLogin(), function (req:express.Request, res:express.Response)
        {
            var book = req.body[ApiConstants.BOOK];
            var bookId:number = parseInt(req.params[ApiConstants.BOOK_ID]);

            bookDelegate.update({id: bookId}, book)
                .then(
                function profileUpdated(profile) { res.json(profile); },
                function profileUpdateError(error) { res.status(500).send(error); }
            );
        });

        app.put(ApiUrlDelegate.book(), AuthenticationDelegate.checkLogin(), function (req:express.Request, res:express.Response)
        {
            var book = req.body[ApiConstants.BOOK];

            bookDelegate.create(book)
                .then(
                function profileCreated(profile) { res.json(profile); },
                function profileCreateError(error) { res.status(500).send(error); }
            );
        });

        app.delete(ApiUrlDelegate.bookById(), AuthenticationDelegate.checkLogin(), function (req:express.Request, res:express.Response)
        {
            var bookId = req.params[ApiConstants.BOOK_ID];

            bookDelegate.delete(bookId)
                .then(
                function profileDeleted(profile) { res.json(profile); },
                function profileDeleteError(error) { res.status(500).send(error); }
            );
        });

    }

}
export = BookApi