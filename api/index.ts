import BookApi                                      = require('./BookApi');
import ReviewApi                                    = require('./ReviewApi');
import UserApi                                      = require('./UserApi');

function init(app)
{
    new BookApi(app);
    new ReviewApi(app);
    new UserApi(app);
}
export = init