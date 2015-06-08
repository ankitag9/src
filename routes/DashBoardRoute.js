///<reference path='../_references.d.ts'/>
var _ = require('underscore');

var express = require('express');
var Urls = require('./Urls');
var Config = require('../common/Config');

var EmailDelegate = require('../delegates/EmailDelegate');
var UserDelegate = require('../delegates/UserDelegate');
var AuthenticationDelegate = require('../delegates/AuthenticationDelegate');
var User = require('../models/User');
var ApiConstants = require('../enums/ApiConstants');
var UserType = require('../enums/UserType');

var DashBoardRoute = (function () {
    function DashBoardRoute(app) {
        this.emailDelegate = new EmailDelegate();
        this.userDelegate = new UserDelegate();
        app.get(Urls.login(), this.login.bind(this));
        app.post(Urls.login(), AuthenticationDelegate.login(), this.loginSubmit.bind(this));
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
        var bookId = parseInt(req.params[ApiConstants.BOOK_ID]);
        res.render(DashBoardRoute.BOOK_PAGE);
    };

    DashBoardRoute.prototype.author = function (req, res) {
        var authorId = parseInt(req.params[ApiConstants.AUTHOR_ID]);
        res.render(DashBoardRoute.AUTHOR_PAGE);
    };

    DashBoardRoute.prototype.dashboard = function (req, res) {
        var loggedInUser = req.user;
        switch (loggedInUser[User.COL_USER_TYPE]) {
            case 1 /* ADMIN */:
                res.render(DashBoardRoute.DASHBOARD_ADMIN);
                break;
            case 2 /* AUTHOR */:
                res.render(DashBoardRoute.DASHBOARD_AUTHOR);
                break;
            case 3 /* BLOGGER */:
                res.render(DashBoardRoute.DASHBOARD_BLOGGER);
                break;
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
