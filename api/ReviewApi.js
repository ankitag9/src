var ApiUrlDelegate = require('../delegates/ApiUrlDelegate');
var ReviewDelegate = require('../delegates/ReviewDelegate');
var AuthenticationDelegate = require('../delegates/AuthenticationDelegate');
var ApiConstants = require('../enums/ApiConstants');

var ReviewApi = (function () {
    function ReviewApi(app) {
        var reviewDelegate = new ReviewDelegate();

        app.get(ApiUrlDelegate.reviewById(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var reviewId = parseInt(req.params[ApiConstants.REVIEW_ID]);

            reviewDelegate.get(reviewId).then(function profileFetched(profile) {
                res.json(profile);
            }, function profileFetchError(error) {
                res.status(500).send(error);
            });
        });

        app.get(ApiUrlDelegate.review(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var review = req.body[ApiConstants.REVIEW];

            reviewDelegate.search(review).then(function profileFetched(profile) {
                res.json(profile);
            }, function profileFetchError(error) {
                res.status(500).send(error);
            });
        });

        app.post(ApiUrlDelegate.reviewById(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var review = req.body[ApiConstants.REVIEW];
            var reviewId = parseInt(req.params[ApiConstants.REVIEW_ID]);

            reviewDelegate.update({ id: reviewId }, review).then(function profileUpdated(profile) {
                res.json(profile);
            }, function profileUpdateError(error) {
                res.status(500).send(error);
            });
        });

        app.put(ApiUrlDelegate.review(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var review = req.body[ApiConstants.REVIEW];

            reviewDelegate.create(review).then(function profileCreated(profile) {
                res.json(profile);
            }, function profileCreateError(error) {
                res.status(500).send(error);
            });
        });

        app.delete(ApiUrlDelegate.reviewById(), AuthenticationDelegate.checkLogin(), function (req, res) {
            var reviewId = req.params[ApiConstants.REVIEW_ID];

            reviewDelegate.delete(reviewId).then(function profileDeleted(profile) {
                res.json(profile);
            }, function profileDeleteError(error) {
                res.status(500).send(error);
            });
        });
    }
    return ReviewApi;
})();
module.exports = ReviewApi;
//# sourceMappingURL=ReviewApi.js.map
