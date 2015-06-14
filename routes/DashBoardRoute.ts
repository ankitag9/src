///<reference path='../_references.d.ts'/>
import _                                            = require('underscore');
import q                                            = require('q');
import express                                      = require('express');
import Urls                                         = require('./Urls');
import Config                                       = require('../common/Config');
import Coral                                        = require('Coral');
import EmailDelegate                                = require('../delegates/EmailDelegate');
import UserDelegate                                 = require('../delegates/UserDelegate');
import BookDelegate                                 = require('../delegates/BookDelegate');
import AuthenticationDelegate                       = require('../delegates/AuthenticationDelegate');
import ReviewDelegate                               = require('../delegates/ReviewDelegate');
import User                                         = require('../models/User');
import Book                                         = require('../models/Book');
import Review                                       = require('../models/Review');
import ApiConstants                                 = require('../enums/ApiConstants');
import UserType                                     = require('../enums/UserType');
import BookGenre                                    = require('../enums/BookGenre');
import ReviewStatus                                 = require('../enums/ReviewStatus');

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
    bookDelegate = new BookDelegate();
    reviewDelegate = new ReviewDelegate();

    constructor(app)
    {
        app.get(Urls.login(), this.login.bind(this));
        app.post(Urls.login(), AuthenticationDelegate.login(), this.loginSubmit.bind(this));
        app.get(Urls.logout(), this.logout.bind(this));
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

    private logout(req:express.Request, res:express.Response)
    {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        req.logout();
        res.clearCookie("connect.sid");
        var returnToUrl:string = req.query[ApiConstants.RETURN_TO] || Urls.login();
        res.redirect(returnToUrl);
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
        user.setUserType(UserType.BLOGGER);
        self.userDelegate.create(user)
            .then(
            function userCreated()
            {
                res.status(200).json('Registration Successful. Please Login to continue.');
            })
            .fail(
            function error(error)
            {
                res.status(500).json(error.message);
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
        var self = this;
        var bookId:number = parseInt(req.params[ApiConstants.BOOK_ID]);
        var review:Review = new Review();
        review.setBookId(bookId);
        review.setStatus(ReviewStatus.ACCEPTED_BY_ADMIN);
        q.all([
            self.reviewDelegate.search(review,{},[Review.FK_USER]),
            self.bookDelegate.get(bookId)
        ])
            .then(
            function bookFetched(...args)
            {
                var reviews:Review[] = args[0][0] || [];
                var book:Book = args[0][1];
                var data = {
                    BookGenre:Coral.Utils.enumToNormalText(BookGenre),
                    book:book,
                    reviews:reviews
                }
                res.render(DashBoardRoute.BOOK_PAGE,data);
            })
    }

    private author(req:express.Request, res:express.Response)
    {
        var authorId:number = parseInt(req.params[ApiConstants.AUTHOR_ID]);
        res.render(DashBoardRoute.AUTHOR_PAGE);
    }

    private dashboard(req:express.Request, res:express.Response)
    {
        var loggedInUser = req.user;
        var self = this;

        if(Coral.Utils.isNullOrEmpty(loggedInUser))
            res.redirect(DashBoardRoute.LOGIN_PAGE);
        else
        {
            switch(loggedInUser[User.COL_USER_TYPE])
            {
                case UserType.ADMIN:
                    var review:Review = new Review();
                    review.setStatus(ReviewStatus.REVIEWED_BY_BLOGGER);
                    q.all([
                        self.userDelegate.search({}),
                        self.bookDelegate.search({}),
                        self.reviewDelegate.search(review,{},[Review.FK_BOOK,Review.FK_USER])
                    ])
                        .then(
                        function booksFetched(...args)
                        {
                            var users:User[] = args[0][0];
                            var books:Book[] = args[0][1];
                            var review:Review[] = args[0][2] || [];
                            var data = {
                                user:loggedInUser,
                                BookGenre:Coral.Utils.enumToNormalText(BookGenre),
                                UserRole:Coral.Utils.enumToNormalText(UserType),
                                books:books,
                                users:users,
                                reviews:review
                            };
                            res.render(DashBoardRoute.DASHBOARD_ADMIN,data);
                        })
                    break;
                case UserType.AUTHOR:
                    var data = {};
                    res.render(DashBoardRoute.DASHBOARD_AUTHOR,data);
                    break;
                case UserType.BLOGGER:
                    var review:Review = new Review();
                    review.setUserId(loggedInUser.id);
                    self.reviewDelegate.search(review,{},[Review.FK_BOOK])
                        .then(
                        function reviewFetched(reviews:Review[])
                        {
                            var pending = _.filter(reviews,function(review:Review){ return review.getStatus() == ReviewStatus.SENT_TO_BLOGGER }) || [];
                            var reviewed = _.filter(reviews,function(review:Review){ return review.getStatus() != ReviewStatus.SENT_TO_BLOGGER }) || [];
                            var data = {
                                reviewed:reviewed,
                                pending:pending,
                                user:loggedInUser,
                                BookGenre:Coral.Utils.enumToNormalText(BookGenre)
                            };
                            res.render(DashBoardRoute.DASHBOARD_BLOGGER,data);
                        })
                    break;
            }
        }
    }
}
export = DashBoardRoute