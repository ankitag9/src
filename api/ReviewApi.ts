import q                                                    = require('q');
import express                                              = require('express');
import passport                                             = require('passport');
import ApiUrlDelegate                                       = require('../delegates/ApiUrlDelegate');
import ReviewDelegate                                  = require('../delegates/ReviewDelegate');
import AuthenticationDelegate                               = require('../delegates/AuthenticationDelegate');
import ApiConstants                                         = require('../enums/ApiConstants');
import Review                                          = require('../models/Review');

class ReviewApi
{
    constructor(app)
    {
        var reviewDelegate = new ReviewDelegate();

        app.get(ApiUrlDelegate.reviewById(), AuthenticationDelegate.checkLogin(), function(req:express.Request, res:express.Response)
        {
            var reviewId:number = parseInt(req.params[ApiConstants.REVIEW_ID]);

            reviewDelegate.get(reviewId)
                .then(
                function profileFetched(profile) { res.json(profile); },
                function profileFetchError(error) { res.status(500).send(error); }
            );
        });

        app.get(ApiUrlDelegate.review(), AuthenticationDelegate.checkLogin(), function (req:express.Request, res:express.Response)
        {
            var review = req.body[ApiConstants.REVIEW];

            reviewDelegate.search(review)
                .then(
                function profileFetched(profile) { res.json(profile); },
                function profileFetchError(error) { res.status(500).send(error); }
            );
        });

        app.post(ApiUrlDelegate.reviewById(), AuthenticationDelegate.checkLogin(), function (req:express.Request, res:express.Response)
        {
            var review = req.body[ApiConstants.REVIEW];
            var reviewId:number = parseInt(req.params[ApiConstants.REVIEW_ID]);

            reviewDelegate.update({id: reviewId}, review)
                .then(
                function profileUpdated(profile) { res.json(profile); },
                function profileUpdateError(error) { res.status(500).send(error); }
            );
        });

        app.put(ApiUrlDelegate.review(), AuthenticationDelegate.checkLogin(), function (req:express.Request, res:express.Response)
        {
            var review = req.body[ApiConstants.REVIEW];

            reviewDelegate.create(review)
                .then(
                function profileCreated(profile) { res.json(profile); },
                function profileCreateError(error) { res.status(500).send(error); }
            );
        });

        app.delete(ApiUrlDelegate.reviewById(), AuthenticationDelegate.checkLogin(), function (req:express.Request, res:express.Response)
        {
            var reviewId = req.params[ApiConstants.REVIEW_ID];

            reviewDelegate.delete(reviewId)
                .then(
                function profileDeleted(profile) { res.json(profile); },
                function profileDeleteError(error) { res.status(500).send(error); }
            );
        });

    }

}
export = ReviewApi