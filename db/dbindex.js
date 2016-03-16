var loginCreate = require('./loginCreate.js');
var idCheck = require('./idCheck.js');
var login = require('./login.js');

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

module.exports = function(app){
    
    app.get('/api/idcheck/', function(req, res){
        idCheck(req.query.id, res);
    });
    
    app.post('/api/loginCreate', jsonParser, function(req, res){
        loginCreate(req.body, res);
    });
    
    app.post('/api/login', jsonParser, function (req, res) {
        login(req.body, res);
    });
    
}