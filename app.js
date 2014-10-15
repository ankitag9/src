var express = require('express');

var path = require('path');
var DashBoardRoute = require('./routes/DashBoardRoute');
var Api = require('./api/index');
var Config = require('./common/Config');

 {
    var app = express();
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    var oneDay = 86400000;
    app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay }));

    app.use(express.json());

    app.set('port', Config.get(Config.PORT));
    app.listen(app.get('port'), function () {
        console.log('BBN server started on port ' + Config.get(Config.PORT));
    });

    new DashBoardRoute(app);
    new Api(app);
}
//# sourceMappingURL=app.js.map
