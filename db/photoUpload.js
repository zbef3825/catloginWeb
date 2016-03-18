var petModel = require('./mongodbConnect.js');
var moment = require('moment');

module.exports = function(req, res){
    //console.log(req.body)
    var save = {
        imglink: req.body.data.url,
        likedUser: [],
        upvote: 0,
        report: false,
        reportcomment: [],
        date: moment().format("YYYYMMDDHHmmss"),
        pettype: req.body.data.type,
        photocomment: [],
        photocommentnum: 0
        }
    
    var request = petModel(save);
    request.save(function(err){
        if(err) {
            return res.status(500).send({
                success: false,
                date: moment().format("YYYYMMDD")
            });
        }
        else {
            return res.status(200).send({
                success: true,
                date: moment().format("YYYYMMDD")
            });
        }
    });
}