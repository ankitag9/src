///<reference path='../_references.d.ts'/>
var _ = require('underscore');

var express = require('express');
var Urls = require('./Urls');
var Config = require('../common/Config');

var EmailDelegate = require('../delegates/EmailDelegate');

var DashBoardRoute = (function () {
    function DashBoardRoute(app) {
        this.emailDelegate = new EmailDelegate();
        app.get(Urls.home(), this.home.bind(this));
        app.get(Urls.confirmation(), this.confirmation.bind(this));

        app.get(Urls.submit(), this.submit.bind(this));
        app.post(Urls.uploadFile(), express.bodyParser({ keepExtensions: true, uploadDir: Config.get(Config.UPLOAD_PATH) }), this.upload.bind(this));
        app.post(Urls.submit(), this.submitPost.bind(this));
    }
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
        path = 'http://www.bookbanyan.com/upload/' + _.last(path.split('/'));
        res.json(path).status(200);
    };

    DashBoardRoute.prototype.submitPost = function (req, res) {
        var user = req.body['user'];
        var book = req.body['book'];

        this.emailDelegate.sendManuscriptSubmitEmail(user, book).then(function emailSent() {
            res.json('OK').status(200);
        });
    };
    DashBoardRoute.SUBMIT_PAGE = 'submit';
    DashBoardRoute.HOME_PAGE = 'home';
    DashBoardRoute.CONFIRMATION_PAGE = 'confirmation';
    return DashBoardRoute;
})();
module.exports = DashBoardRoute;
//# sourceMappingURL=DashBoardRoute.js.map
