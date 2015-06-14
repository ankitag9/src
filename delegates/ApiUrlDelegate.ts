///<reference path='../_references.d.ts'/>
import Coral                                            = require('Coral');

/*
 * Class to hold all API URLs
 * Note: Not using a generator for fine grained control and prevent unexpected behaviour
 */
class ApiUrlDelegate
{
    /* URL patterns for user API */
    static user():string { return Coral.Utils.generateUrl('/rest/user'); }
    static userById(userId?:number):string { return Coral.Utils.generateUrl('/rest/user/:userId(\\d+)', {userId: userId}); }
    static userProfilePicture(userId?:number, baseUrl?:string):string { return Coral.Utils.generateUrl('/rest/user/:userId(\\d+)/picture', {userId: userId}, baseUrl); }

    /* URL patterns for user profile */
    static userProfile():string { return Coral.Utils.generateUrl('/rest/user/profile'); }
    static userProfileById(profileId?:number):string { return Coral.Utils.generateUrl('/rest/user/profile/:profileId(\\d+)', {profileId: profileId}); }

    /* URL patterns for book */
    static book():string { return Coral.Utils.generateUrl('/rest/book'); }
    static bookCover(bookId?:number):string { return Coral.Utils.generateUrl('/rest/book/:bookId(\\d+)/cover'); }
    static bookById(bookId?:number):string { return Coral.Utils.generateUrl('/rest/book/:bookId(\\d+)', {bookId: bookId}); }

    /* URL patterns for review */
    static review():string { return Coral.Utils.generateUrl('/rest/review'); }
    static reviewById(reviewId?:number):string { return Coral.Utils.generateUrl('/rest/review/:reviewId(\\d+)', {reviewId: reviewId}); }

}
export = ApiUrlDelegate