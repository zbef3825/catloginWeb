var petModel = require('./mongodbConnect.js');
var moment = require('moment');

module.exports = function(req, res){
    
    
    search = {
        date: req.body.date,
        imglink: req.body.imglink
    }
    //console.log(req.body);
    petModel
    .findOneAndUpdate(search, {$set:{upvote: req.body.upvote + 1}}, {new: true})
    .exec(function(err){
        if(err){
            console.error(err);
            return res.status(500).send({
                date: moment().format("YYYYMMDD"),
                success: false
            });
        }
        else {
            return res.status(200).send({
                date: moment().format("YYYYMMDD"),
                success: true 
            });
        }
    });
}