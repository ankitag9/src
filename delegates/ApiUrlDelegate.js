///<reference path='../_references.d.ts'/>
var Coral = require('Coral');

/*
* Class to hold all API URLs
* Note: Not using a generator for fine grained control and prevent unexpected behaviour
*/
var ApiUrlDelegate = (function () {
    function ApiUrlDelegate() {
    }
    /* URL patterns for user API */
    ApiUrlDelegate.user = function () {
        return Coral.Utils.generateUrl('/rest/user');
    };
    ApiUrlDelegate.userById = function (userId) {
        return Coral.Utils.generateUrl('/rest/user/:userId(\\d+)', { userId: userId });
    };
    ApiUrlDelegate.userProfilePicture = function (userId, baseUrl) {
        return Coral.Utils.generateUrl('/rest/user/:userId(\\d+)/picture', { userId: userId }, baseUrl);
    };

    /* URL patterns for user profile */
    ApiUrlDelegate.userProfile = function () {
        return Coral.Utils.generateUrl('/rest/user/profile');
    };
    ApiUrlDelegate.userProfileById = function (profileId) {
        return Coral.Utils.generateUrl('/rest/user/profile/:profileId(\\d+)', { profileId: profileId });
    };

    /* URL patterns for book */
    ApiUrlDelegate.book = function () {
        return Coral.Utils.generateUrl('/rest/book');
    };
    ApiUrlDelegate.bookById = function (bookId) {
        return Coral.Utils.generateUrl('/rest/book/:bookId(\\d+)', { bookId: bookId });
    };

    /* URL patterns for review */
    ApiUrlDelegate.review = function () {
        return Coral.Utils.generateUrl('/rest/review');
    };
    ApiUrlDelegate.reviewById = function (reviewId) {
        return Coral.Utils.generateUrl('/rest/review/:reviewId(\\d+)', { reviewId: reviewId });
    };
    return ApiUrlDelegate;
})();
module.exports = ApiUrlDelegate;
//# sourceMappingURL=ApiUrlDelegate.js.map
