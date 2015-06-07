///<reference path='./_references.d.ts'/>
import _                                            = require('underscore');
import q                                            = require('q');
import express                                      = require('express');
import https                                        = require('https');
import moment                                       = require('moment');
import path                                         = require('path');
import passport                                     = require('passport');
import connect_flash                                = require("connect-flash");
import DashBoardRoute                               = require('./routes/DashBoardRoute');
import Api                                          = require('./api/index');
import Config                                       = require('./common/Config');
import Coral                                        = require('Coral');
var connect = require('connect');
var session = require('express-session');
var RedisStore = require('connect-redis')(connect);


new Coral.MysqlDelegate(Config.get(Config.DATABASE_HOST), Config.get(Config.DATABASE_NAME), Config.get(Config.DATABASE_USER), Config.get(Config.DATABASE_PASS), Config.get(Config.DATABASE_SOCKET));
/* Underscore settings and helpers */
_.templateSettings = {
    evaluate: /\{\[([\s\S]+?)\]\}/g,
    interpolate: /\{\{([\s\S]+?)\}\}/g
};

var app:express.Application = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'), {maxAge: oneDay}));

app.use(express.json());
app.use(express.urlencoded());

app.use(session({
    secret: 'bookbanyan.in',
    cookie: {maxAge: Config.get(Config.SESSION_EXPIRY)},
    store: new RedisStore({
        host: Config.get(Config.REDIS_HOST),
        port: Config.get(Config.REDIS_SESSION_PORT)
    }),
    rolling: true
}));
app.use(passport.initialize());
app.use(passport.session({}));
app.use(connect_flash());

app.set('port', Config.get(Config.PORT));
app.listen(app.get('port'), function(){
    console.log('BBN server started on port ' + Config.get(Config.PORT));
});

new DashBoardRoute(app);
new Api(app);