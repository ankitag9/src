///<reference path='./_references.d.ts'/>
import _                                            = require('underscore');
import q                                            = require('q');
import express                                      = require('express');
import https                                        = require('https');
import moment                                       = require('moment');
import path                                         = require('path');
import DashBoardRoute                               = require('./routes/DashBoardRoute');
import Api                                          = require('./api/index');
import Config                                       = require('./common/Config');

{
    var app:express.Application = express();
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    var oneDay = 86400000;
    app.use(express.static(path.join(__dirname, 'public'), {maxAge: oneDay}));

    app.use(express.json());

    app.set('port', Config.get(Config.PORT));
    app.listen(app.get('port'), function(){
        console.log('BBN server started on port ' + Config.get(Config.PORT));
    });

    new DashBoardRoute(app);
    new Api(app);
}
