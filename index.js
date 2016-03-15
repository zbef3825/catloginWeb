var express  = require('express');
var pg = require('pg');

var dbIndex = require('./db/dbindex.js');
var dbConnect = require('./db/dbconnect.js');

app = express();

PORT = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

dbConnect();

dbIndex(app);

app.listen(PORT);