///<reference path='../_references.d.ts'/>
var _ = require('underscore');
var q = require('q');
var express = require('express');
var Urls = require('./Urls');
var Config = require('../common/Config');
var Coral = require('Coral');
var EmailDelegate = require('../delegates/EmailDelegate');
var UserDelegate = require('../delegates/UserDelegate');
var BookDelegate = require('../delegates/BookDelegate');
var AuthenticationDelegate = require('../delegates/AuthenticationDelegate');
var ReviewDelegate = require('../delegates/ReviewDelegate');
var User = require('../models/User');

var Review = require('../models/Review');
var ApiConstants = require('../enums/ApiConstants');
var UserType = require('../enums/UserType');
var BookGenre = require('../enums/BookGenre');
var ReviewStatus = require('../enums/ReviewStatus');

var DashBoardRoute = (function () {
    function DashBoardRoute(app) {
        this.emailDelegate = new EmailDelegate();
        this.userDelegate = new UserDelegate();
        this.bookDelegate = new BookDelegate();
        this.reviewDelegate = new ReviewDelegate();
        app.get(Urls.login(), this.login.bind(this));
        app.post(Urls.login(), AuthenticationDelegate.login(), this.loginSubmit.bind(this));
        app.get(Urls.logout(), this.logout.bind(this));
        app.get(Urls.register(), this.register.bind(this));
        app.post(Urls.register(), this.registerSubmit.bind(this));

        app.get(Urls.home(), this.home.bind(this));
        app.get(Urls.confirmation(), this.confirmation.bind(this));
        app.get(Urls.submit(), this.submit.bind(this));
        app.post(Urls.uploadFile(), express.bodyParser({ keepExtensions: true, uploadDir: Config.get(Config.UPLOAD_PATH) }), this.upload.bind(this));
        app.post(Urls.submit(), this.submitPost.bind(this));

        app.get(Urls.book(), this.book.bind(this));
        app.get(Urls.author(), this.author.bind(this));
        app.get(Urls.dashboard(), this.dashboard.bind(this));
    }
    DashBoardRoute.prototype.login = function (req, res) {
        res.render(DashBoardRoute.LOGIN_PAGE);
    };

    DashBoardRoute.prototype.loginSubmit = function (req, res) {
        res.redirect(Urls.dashboard());
    };

    DashBoardRoute.prototype.logout = function (req, res) {
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        req.logout();
        res.clearCookie("connect.sid");
        var returnToUrl = req.query[ApiConstants.RETURN_TO] || Urls.login();
        res.redirect(returnToUrl);
    };

    DashBoardRoute.prototype.register = function (req, res) {
        res.render(DashBoardRoute.REGISTER_PAGE);
    };

    DashBoardRoute.prototype.registerSubmit = function (req, res) {
        var self = this;

        var user = new User();
        user.setName(req.body['name']);
        user.setEmail(req.body['email']);
        user.setPassword(req.body['password']);
        user.setUserType(3 /* BLOGGER */);
        self.userDelegate.create(user).then(function userCreated() {
            res.status(200).json('Registration Successful. Please Login to continue.');
        }).fail(function error(error) {
            res.status(500).json(error.message);
        });
    };

    DashBoardRoute.prototype.submit = function (req, res) {
        res.render(DashBoardRoute.SUBMIT_PAGE);
    };

    DashBoardRoute.prototype.home = function (req, res) {
        res.render(DashBoardRoute.HOME_PAGE);
    };

    DashBoardRoute.prototype.confirmation = function (req, res) {
        res.render(DashBoardRoute.CONFIRMATION_PAGE);
    };

    DashBoardRoute.prototype.upload = function (req, res) {
        var path = req.files['files'][0].path;
        var name = req.files['files'][0].name;
        path = 'http://www.bookbanyan.com/upload/' + _.last(path.split('/'));
        res.json({ name: name, path: path }).status(200);
    };

    DashBoardRoute.prototype.submitPost = function (req, res) {
        var user = req.body['user'];
        var book = req.body['book'];

        this.emailDelegate.sendManuscriptSubmitEmail(user, book).then(function emailSent() {
            res.json('OK').status(200);
        });
    };

    DashBoardRoute.prototype.book = function (req, res) {
        var self = this;
        var bookId = parseInt(req.params[ApiConstants.BOOK_ID]);
        var review = new Review();
        review.setBookId(bookId);
        review.setStatus(3 /* ACCEPTED_BY_ADMIN */);
        q.all([
            self.reviewDelegate.search(review, {}, [Review.FK_USER]),
            self.bookDelegate.get(bookId)
        ]).then(function bookFetched() {
            var args = [];
            for (var _i = 0; _i < (arguments.length - 0); _i++) {
                args[_i] = arguments[_i + 0];
            }
            var reviews = args[0][0] || [];
            var book = args[0][1];
            var data = {
                BookGenre: Coral.Utils.enumToNormalText(BookGenre),
                book: book,
                reviews: reviews
            };
            res.render(DashBoardRoute.BOOK_PAGE, data);
        });
    };

    DashBoardRoute.prototype.author = function (req, res) {
        var authorId = parseInt(req.params[ApiConstants.AUTHOR_ID]);
        res.render(DashBoardRoute.AUTHOR_PAGE);
    };

    DashBoardRoute.prototype.dashboard = function (req, res) {
        var loggedInUser = req.user;
        var self = this;

        if (Coral.Utils.isNullOrEmpty(loggedInUser))
            res.redirect(DashBoardRoute.LOGIN_PAGE);
        else {
            switch (loggedInUser[User.COL_USER_TYPE]) {
                case 1 /* ADMIN */:
                    var review = new Review();
                    review.setStatus(2 /* REVIEWED_BY_BLOGGER */);
                    q.all([
                        self.userDelegate.search({}),
                        self.bookDelegate.search({}),
                        self.reviewDelegate.search(review, {}, [Review.FK_BOOK, Review.FK_USER])
                    ]).then(function booksFetched() {
                        var args = [];
                        for (var _i = 0; _i < (arguments.length - 0); _i++) {
                            args[_i] = arguments[_i + 0];
                        }
                        var users = args[0][0];
                        var books = args[0][1];
                        var review = args[0][2] || [];
                        var data = {
                            user: loggedInUser,
                            BookGenre: Coral.Utils.enumToNormalText(BookGenre),
                            UserRole: Coral.Utils.enumToNormalText(UserType),
                            books: books,
                            users: users,
                            reviews: review
                        };
                        res.render(DashBoardRoute.DASHBOARD_ADMIN, data);
                    });
                    break;
                case 2 /* AUTHOR */:
                    var data = {};
                    res.render(DashBoardRoute.DASHBOARD_AUTHOR, data);
                    break;
                case 3 /* BLOGGER */:
                    var review = new Review();
                    review.setUserId(loggedInUser.id);
                    self.reviewDelegate.search(review, {}, [Review.FK_BOOK]).then(function reviewFetched(reviews) {
                        var pending = _.filter(reviews, function (review) {
                            return review.getStatus() == 1 /* SENT_TO_BLOGGER */;
                        });
                        var reviewed = _.filter(reviews, function (review) {
                            return review.getStatus() != 1 /* SENT_TO_BLOGGER */;
                        });
                        var data = {
                            reviewed: reviewed,
                            pending: pending,
                            user: loggedInUser,
                            BookGenre: Coral.Utils.enumToNormalText(BookGenre)
                        };
                        res.render(DashBoardRoute.DASHBOARD_BLOGGER, data);
                    });
                    break;
            }
        }
    };
    DashBoardRoute.LOGIN_PAGE = 'login';
    DashBoardRoute.REGISTER_PAGE = 'register';
    DashBoardRoute.SUBMIT_PAGE = 'submit';
    DashBoardRoute.HOME_PAGE = 'home';
    DashBoardRoute.CONFIRMATION_PAGE = 'confirmation';
    DashBoardRoute.BOOK_PAGE = 'book';
    DashBoardRoute.AUTHOR_PAGE = 'author';
    DashBoardRoute.DASHBOARD_ADMIN = 'admin/dashboard';
    DashBoardRoute.DASHBOARD_AUTHOR = 'author/dashboard';
    DashBoardRoute.DASHBOARD_BLOGGER = 'blogger/dashboard';
    return DashBoardRoute;
})();
module.exports = DashBoardRoute;
//# sourceMappingURL=DashBoardRoute.js.map
