var petModel = require('./mongodbConnect.js');
var moment = require('moment');

module.exports = function(req, res){
    search = {
        _id: req.query._id
    }
    petModel
    .findOneAndRemove(search)
    .exec(function(err){
        if(err){
            return res.status(500).send({
                date: moment().format("YYYYMMDD"),
                success:false
            });
        }
        else {
            return res.status(200).send({
                date: moment().format("YYYYMMDD"),
                success:true
            });
        }
    });

}