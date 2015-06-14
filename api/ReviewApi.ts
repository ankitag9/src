import q                                                    = require('q');
import Coral                                      = require('Coral');
import express                                              = require('express');
import passport                                             = require('passport');
import ApiUrlDelegate                                       = require('../delegates/ApiUrlDelegate');
import ReviewDelegate                                       = require('../delegates/ReviewDelegate');
import ReviewCommentDelegate                                = require('../delegates/ReviewCommentDelegate');
import AuthenticationDelegate                               = require('../delegates/AuthenticationDelegate');
import ApiConstants                                         = require('../enums/ApiConstants');
import Review                                               = require('../models/Review');
import ReviewStatus                                         = require('../enums/ReviewStatus');
import ReviewComment                                        = require('../models/ReviewComment');

class ReviewApi
{
    constructor(app)
    {
        var reviewDelegate = new ReviewDelegate();
        var reviewCommentDelegate = new ReviewCommentDelegate();

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
            var review:Review = new Review(req.body[ApiConstants.REVIEW]);
            var reviewId:number = parseInt(req.params[ApiConstants.REVIEW_ID]);
            var loggedInUser = req.user;
            var tasks = [reviewDelegate.update({id: reviewId}, review)];

            if(!Coral.Utils.isNullOrEmpty(req.body[ApiConstants.REVIEW_COMMENT]))
            {
                var reviewComment:ReviewComment = new ReviewComment(req.body[ApiConstants.REVIEW_COMMENT]);
                reviewComment.setReviewId(reviewId);
                reviewComment.setUserId(loggedInUser.id);
                tasks.push(reviewCommentDelegate.create(reviewComment));
            }

            q.all(tasks)
                .then(
                function profileUpdated(profile) { res.json(profile); },
                function profileUpdateError(error) { res.status(500).send(error); }
            );
        });

        app.put(ApiUrlDelegate.review(), AuthenticationDelegate.checkLogin(), function (req:express.Request, res:express.Response)
        {
            var review:Review = new Review(req.body[ApiConstants.REVIEW]);
            review.setStatus(ReviewStatus.SENT_TO_BLOGGER);

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