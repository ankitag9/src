///<reference path='../_references.d.ts'/>
import _                                            = require('underscore');
import q                                            = require('q');
import express                                      = require('express');
import Urls                                         = require('./Urls');
import Config                                       = require('../common/Config');
import Coral                                        = require('Coral');
import EmailDelegate                                = require('../delegates/EmailDelegate');
import UserDelegate                                 = require('../delegates/UserDelegate');
import AuthenticationDelegate                       = require('../delegates/AuthenticationDelegate');
import User                                         = require('../models/User');
import ApiConstants                                 = require('../enums/ApiConstants');
import UserType                                     = require('../enums/UserType');

class DashBoardRoute
{
    private static LOGIN_PAGE:string = 'login';
    private static REGISTER_PAGE:string = 'register';
    private static SUBMIT_PAGE:string = 'submit';
    private static HOME_PAGE:string = 'home';
    private static CONFIRMATION_PAGE:string = 'confirmation';
    private static BOOK_PAGE:string = 'book';
    private static AUTHOR_PAGE:string = 'author';
    private static DASHBOARD_ADMIN:string = 'admin/dashboard';
    private static DASHBOARD_AUTHOR:string = 'author/dashboard';
    private static DASHBOARD_BLOGGER:string = 'blogger/dashboard';

    emailDelegate = new EmailDelegate();
    userDelegate = new UserDelegate();

    constructor(app)
    {
        app.get(Urls.login(), this.login.bind(this));
        app.post(Urls.login(), AuthenticationDelegate.login(), this.loginSubmit.bind(this));
        app.get(Urls.register(), this.register.bind(this));
        app.post(Urls.register(), this.registerSubmit.bind(this));

        app.get(Urls.home(), this.home.bind(this));
        app.get(Urls.confirmation(),this.confirmation.bind(this));
        app.get(Urls.submit(), this.submit.bind(this));
        app.post(Urls.uploadFile(),express.bodyParser({keepExtensions: true,uploadDir: Config.get(Config.UPLOAD_PATH)}),this.upload.bind(this));
        app.post(Urls.submit(), this.submitPost.bind(this));

        app.get(Urls.book(), this.book.bind(this));
        app.get(Urls.author(), this.author.bind(this));
        app.get(Urls.dashboard(), this.dashboard.bind(this));
    }

    private login(req:express.Request, res:express.Response)
    {
        res.render(DashBoardRoute.LOGIN_PAGE);
    }

    private loginSubmit(req:express.Request, res:express.Response)
    {
        res.redirect(Urls.dashboard());
    }

    private register(req:express.Request, res:express.Response)
    {
        res.render(DashBoardRoute.REGISTER_PAGE);
    }

    private registerSubmit(req:express.Request, res:express.Response)
    {
        var self = this;

        var user:User = new User();
        user.setName(req.body['name']);
        user.setEmail(req.body['email']);
        user.setPassword(req.body['password']);
        self.userDelegate.create(user)
            .then(
            function userCreated()
            {
                res.status(200).send('ok');
            })
            .fail(
            function error(error)
            {
                res.status(500).json(error);
            })
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
        var loggedInUser = req.user;
        switch(loggedInUser[User.COL_USER_TYPE])
        {
            case UserType.ADMIN:
                res.render(DashBoardRoute.DASHBOARD_ADMIN);
                break;
            case UserType.AUTHOR:
                res.render(DashBoardRoute.DASHBOARD_AUTHOR);
                break;
            case UserType.BLOGGER:
                res.render(DashBoardRoute.DASHBOARD_BLOGGER);
                break;
        }
    }
}
export = DashBoardRoute