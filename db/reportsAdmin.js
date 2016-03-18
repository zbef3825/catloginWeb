var petModel = require('./mongodbConnect.js');
var moment = require('moment');

module.exports = function(req, res){
    search = {
        date: { $lt: Number(moment().format('YYYYMMDDHHmmss'))},
        report: true
    }
    petModel
    .aggregate()
    .match(search)
    .exec(function (err, doc) {
        if(err) {
            return res.status(404).send({
                success: false,
                date: moment().format("YYYMMDD")
            });
        }
        //console.log(doc);
        return res.status(200).send({
            success: true,
            date: moment().format("YYYYMMDD"),
            data: doc
        });
        
    });

}