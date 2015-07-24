var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    appRoute = require('./server/routes/app');

app.use(express.static(__dirname + '/../public'));
app.use( bodyParser.json() );

app.use('/', appRoute);

app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

app.listen(process.env.PORT || 3000);

module.exports = app;