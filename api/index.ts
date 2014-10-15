import UserApi                                      = require('./UserApi');

function init(app)
{
    new UserApi(app);
}
export = init