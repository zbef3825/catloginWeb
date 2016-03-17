var petModel = require('./mongodbConnect.js');
var moment = require('moment');

module.exports = function(req,res){
    search = {
        _id: req.body._id
    }
    petModel
    .findOne(search)
    .exec(function(err,doc){
        newComment = {
            content: req.body.content,
            user: req.body.user,
            date: Number(moment().format("YYYYMMDDHHmmss"))
        }
        console.log(newComment);
        console.log(doc);
        doc.photocomment.push(newComment);
        console.log(doc.photocomment);
        //console.log(typeof doc.photocomment);
        petModel
        .findOneAndUpdate(search, {$set:{"photocomment": doc.photocomment}}, {new: true})
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