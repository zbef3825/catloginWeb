var express  = require('express');
var pg = require('pg');
var expressJWT = require('express-jwt');

var dbIndex = require('./db/dbindex.js');
var dbConnect = require('./db/dbconnect.js');
var mongodbConnect = require('./db/mongodbConnect.js');
var petIndex = require('./db/petIndex.js');

app = express();

PORT = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header("Access-Control-Allow-Methods", "POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

app.use(expressJWT({secret: "example"}).unless({path: ['/', '/api/idcheck/', '/api/loginCreate/', '/api/login/']}));

dbConnect();

dbIndex(app);
petIndex(app);


app.listen(PORT);