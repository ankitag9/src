///<reference path='../_references.d.ts'/>
import _                                            = require('underscore');
import q                                            = require('q');
import express                                      = require('express');
import Urls                                         = require('./Urls');
import Config                                       = require('../common/Config');
import Coral                                        = require('Coral');
import EmailDelegate                                = require('../delegates/EmailDelegate');
import ApiConstants                                 = require('../enums/ApiConstants');

class DashBoardRoute
{
    private static SUBMIT_PAGE:string = 'submit';
    private static HOME_PAGE:string = 'home';
    private static CONFIRMATION_PAGE:string = 'confirmation';
    private static BOOK_PAGE:string = 'book';
    private static AUTHOR_PAGE:string = 'author';
    private static DASHBOARD_ADMIN:string = 'dashboard/admin';
    private static DASHBOARD_AUTHOR:string = 'dashboard/author';
    private static DASHBOARD_BLOGGER:string = 'dashboard/blogger';

    emailDelegate = new EmailDelegate();

    constructor(app)
    {
        app.get(Urls.home(), this.home.bind(this));
        app.get(Urls.confirmation(),this.confirmation.bind(this));
        app.get(Urls.submit(), this.submit.bind(this));
        app.post(Urls.uploadFile(),express.bodyParser({keepExtensions: true,uploadDir: Config.get(Config.UPLOAD_PATH)}),this.upload.bind(this));
        app.post(Urls.submit(), this.submitPost.bind(this));

        app.get(Urls.book(), this.book.bind(this));
        app.get(Urls.author(), this.author.bind(this));
        app.get(Urls.dashboard(), this.dashboard.bind(this));
    }

    private submit(req:express.Request, res:express.Response)
    {
        res.render(DashBoardRoute.SUBMIT_PAGE);
    }

    private home(req:express.Request, res:express.Response)
    {
        res.render(DashBoardRoute.HOME_PAGE);
    }

    private confirmation(req:express.Request, res:express.Response)
    {
        res.render(DashBoardRoute.CONFIRMATION_PAGE);
    }

    private upload(req:express.Request, res:express.Response)
    {
        var path = req.files['files'][0].path;
        var name = req.files['files'][0].name;
        path = 'http://www.bookbanyan.com/upload/' + _.last(path.split('/'))
        res.json({name:name,path:path}).status(200);
    }

    private submitPost(req:express.Request, res:express.Response)
    {
        var user = req.body['user'];
        var book = req.body['book'];

        this.emailDelegate.sendManuscriptSubmitEmail(user,book)
            .then(function emailSent(){
                res.json('OK').status(200);
            })
    }

    private book(req:express.Request, res:express.Response)
    {
        var bookId:number = parseInt(req.params[ApiConstants.BOOK_ID]);
        res.render(DashBoardRoute.BOOK_PAGE);
    }

    private author(req:express.Request, res:express.Response)
    {
        var authorId:number = parseInt(req.params[ApiConstants.AUTHOR_ID]);
        res.render(DashBoardRoute.AUTHOR_PAGE);
    }

    private dashboard(req:express.Request, res:express.Response)
    {
        var userId:number;
        res.render(DashBoardRoute.DASHBOARD_ADMIN);
    }
}
export = DashBoardRoute