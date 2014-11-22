var BookApi = require('./BookApi');
var ReviewApi = require('./ReviewApi');
var UserApi = require('./UserApi');
var UserProfileApi = require('./UserProfileApi');

function init(app) {
    new BookApi(app);
    new ReviewApi(app);
    new UserApi(app);
    new UserProfileApi(app);
}
module.exports = init;
//# sourceMappingURL=index.js.map
