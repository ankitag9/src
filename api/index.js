var BookApi = require('./BookApi');
var ReviewApi = require('./ReviewApi');
var UserApi = require('./UserApi');

function init(app) {
    new BookApi(app);
    new ReviewApi(app);
    new UserApi(app);
}
module.exports = init;
//# sourceMappingURL=index.js.map
