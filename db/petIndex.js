var bodyParser = require('body-parser');
var getPetOne = require('./getPetOne.js');
var upvote = require('./upvote.js');
var report = require('./report.js');
var comment = require('./comment.js');
var topLike = require('./topLike.js');
var topDis  = require('./topDis.js');
var reportsAdmin = require('./reportsAdmin.js');
var photoUpload = require('./photoUpload.js');
var photoDelete = require('./photoDelete.js');

var jsonParser = bodyParser.json();


module.exports = function (app) {
    
    app.get('/api/pets/one', function(req,res){
        //will determine what kind of pet they want to see
        //accepts current post and asks for next document
        
        //display comments as well
        getPetOne(req, req.query.type, req.query.date ,res);
    });
    
    app.post('/api/pets/upvote', jsonParser, function(req,res){
        //will accumulate upvote number by one per click
        upvote(req, res);
        
    });
    
    app.post('/api/pets/report', jsonParser, function(req,res){
        //user reports any error
        //save report flags on each documents
        report(req, res);
    });
    
    app.post('/api/pets/comment', jsonParser, function(req,res){
        //save comments per posts
        comment(req, res);
        
    });
    
    app.get('/api/pets/toplike', function(req,res){
        topLike(req, res);
    });
    
    app.get('/api/pets/topdis', function(req,res){
        topDis(req,res);
    });
    
    app.get('/api/pets/reportsAdmin', function(req, res){
        reportsAdmin(req, res);
    });
    
    app.post('/api/pets/photo', jsonParser, function(req,res){
        photoUpload(req, res);
    })
    
    app.delete('/api/pets/delete', jsonParser, function(req,res){
        //for admin only
        //gives power to admin to delete certain documents that requires delete
        photoDelete(req, res);
    });
    
    
    
    
}