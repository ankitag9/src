///<reference path='../_references.d.ts'/>
import _                                            = require('underscore');
import q                                            = require('q');
import express                                      = require('express');
import Urls                                         = require('./Urls');
import Config                                       = require('../common/Config');
import Coral                                        = require('Coral');
import EmailDelegate                                = require('../delegates/EmailDelegate');

class DashBoardRoute
{
    private static SUBMIT_PAGE:string = 'submit';
    private static HOME_PAGE:string = 'home';
    private static CONFIRMATION_PAGE:string = 'confirmation';
    emailDelegate = new EmailDelegate();

    constructor(app)
    {
        app.get(Urls.home(), this.home.bind(this));
        app.get(Urls.confirmation(),this.confirmation.bind(this));

        app.get(Urls.submit(), this.submit.bind(this));
        app.post(Urls.uploadFile(),express.bodyParser({keepExtensions: true,uploadDir: Config.get(Config.UPLOAD_PATH)}),this.upload.bind(this));
        app.post(Urls.submit(), this.submitPost.bind(this));
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
}
export = DashBoardRoute