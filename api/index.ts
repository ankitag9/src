import BookApi                                      = require('./BookApi');
import ReviewApi                                    = require('./ReviewApi');
import UserApi                                      = require('./UserApi');
import UserProfileApi                               = require('./UserProfileApi');

function init(app)
{
    new BookApi(app);
    new ReviewApi(app);
    new UserApi(app);
    new UserProfileApi(app);
}
export = init