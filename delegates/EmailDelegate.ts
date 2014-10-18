///<reference path='../_references.d.ts'/>
import Coral                                                        = require('Coral');
import _                                                            = require('underscore');
import url                                                          = require('url');
import cheerio                                                      = require('cheerio');
import fs                                                           = require('fs');
import log4js                                                       = require('log4js');
import path                                                         = require('path');
import q                                                            = require('q');
import nodemailer                                                   = require('nodemailer');
import watch                                                        = require('watch');
import User                                                         = require('../models/User')
import Config                                                       = require('../common/Config');

/*
 Delegate class for managing email
 1. Queue new email
 2. Check status of emails
 3. Search emails
 */
class EmailDelegate
{
    private static EMAIL_TEST:string = 'EMAIL_TEST';
    private static USER_MANUSCRIPT_SUBMIT_CONFIRM:string = 'USER_MANUSCRIPT_SUBMIT_CONFIRM';
    private static ADMIN_MANUSCRIPT_SUBMIT:string = 'ADMIN_MANUSCRIPT_SUBMIT';

    private static templateCache:{[templateNameAndLocale:string]:{bodyTemplate:Function; subjectTemplate:Function}} = {};
    private static transport:nodemailer.Transport;
    private static logger:log4js.Logger = log4js.getLogger('EmailDelegate');

    constructor()
    {
        if (Coral.Utils.isNullOrEmpty(EmailDelegate.transport))
            EmailDelegate.transport = nodemailer.createTransport('SMTP', {
                service: 'SendGrid',
                auth: {
                    user: 'bookbanyan',
                    pass: 'ankitag9'
                }
            });
    }

    /* Static constructor workaround */
    private static ctor = (() =>
    {
        new Coral.FileWatcherDelegate(path.resolve(__dirname, '../emailTemplates'), [new RegExp('\.html$')],
            function initHandler(files:string[])
            {
                _.each(files, function (fileName) { EmailDelegate.readFileAndCache(fileName); });
            },
            EmailDelegate.readFileAndCache,
            EmailDelegate.readFileAndCache);
    })();

    private static readFileAndCache(filePath)
    {
        var fileName = filePath.substring(filePath.lastIndexOf(path.sep) + 1);
        var extension = fileName.substring(fileName.lastIndexOf('.') + 1);
        if (extension != 'html') return;

        var fileNameWithoutExtension = fileName.substring(0, fileName.lastIndexOf('.'));
        fs.readFile(filePath, 'utf8', function (err, data)
        {
            if (data)
            {
                EmailDelegate.templateCache[fileNameWithoutExtension.toUpperCase()] =
                {
                    'bodyTemplate': _.template(data),
                    'subjectTemplate': _.template(cheerio.load(data)('title').text())
                };
                EmailDelegate.logger.info('Email template updated: ' + fileNameWithoutExtension.toUpperCase());
            }
        });
    }

    private composeAndSend(template:string, to:string, emailData:Object, from?:string, replyTo?:string):q.Promise<any>
    {
        var deferred = q.defer<any>();

        from = from || 'Bookbanyan.com\<bookbanyanpublications@gmail.com\>';
        replyTo = replyTo || 'no-reply\<no-reply@bookbanyan.com\>';

        try
        {
            var body:string = this.getEmailBody(template, emailData);
            var subject:string = this.getEmailSubject(template, emailData);
        } catch (e)
        {
            EmailDelegate.logger.error('Invalid email template: ' + template);
            deferred.reject("Invalid email data");
            return null;
        }

        EmailDelegate.transport.sendMail(
            {
                from: from,
                to: to,
                replyTo: replyTo,
                subject: subject,
                html: body,
                forceEmbeddedImages: true
            },
            function emailSent(error:Error, response:any)
            {
                if (error)
                {
                    //TODO cache email and try again in sometime
                    EmailDelegate.logger.info('Error in sending Email to: %s, error: %s', to, JSON.stringify(error));
                    deferred.reject(error);
                }
                else
                {
                    EmailDelegate.logger.info('%s email sent to: %s', template, to);
                    deferred.resolve(response);
                }
            }
        );

        return deferred.promise;
    }

    getEmailBody(template:string, emailData:Object):string
    {
        try
        {
            var bodyTemplate:Function = EmailDelegate.templateCache[template].bodyTemplate;
            return bodyTemplate(emailData);
        }
        catch (err)
        {
            EmailDelegate.logger.error("Couldn't generate email body for (template %s, data: %s), Error:" + err, template, JSON.stringify(emailData));
            throw(err);
        }
    }

    getEmailSubject(template:string, emailData:Object):string
    {
        try
        {
            var subjectTemplate:Function = EmailDelegate.templateCache[template].subjectTemplate;
            return subjectTemplate(emailData);
        }
        catch (err)
        {
            EmailDelegate.logger.error("Couldn't generate email subject for (template %s, data: %s), Error: %s", template, emailData, err);


            throw(err);
        }
    }

    sendManuscriptSubmitEmail(user, book):q.Promise<any>
    {
        var self = this;

        return q.all([
            self.composeAndSend(EmailDelegate.USER_MANUSCRIPT_SUBMIT_CONFIRM, user.email,{}),
            self.composeAndSend(EmailDelegate.ADMIN_MANUSCRIPT_SUBMIT, Config.get(Config.ADMIN_EMAIL), {user: user, book:book})
        ]);
    }
}
export = EmailDelegate