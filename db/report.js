var petModel = require('./mongodbConnect.js');
var moment = require('moment');

module.exports = function(req, res){
    
    search = {
        _id: req.body._id
    }
    
    petModel
    .findOne(search)
    .exec(function(err,doc){
        //console.log(doc);
        //console.log(typeof doc.reportComment);
         var newCom = [];
         newCom.push(req.body.comment);
        if(doc.reportcomment != undefined || doc.reportcomment != null){
            doc.reportcomment.forEach(function(entry){
                newCom.push(entry);
            });
        }
        petModel
        .findOneAndUpdate(search, {$set:{"report": true, "reportcomment": newCom}}, {new: true})
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
    });
}