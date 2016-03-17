var petModel = require('./mongodbConnect.js');
var moment = require('moment');

module.exports = function getPetOne(req, type, date, res){
    type == undefined ? typePet = 'all' : typePet = type ;
    if(date == undefined || date == 0){
        currentDoc = moment().format('YYYYMMDDHHmmss');
    }
    else {
        currentDoc = date;
    }
    
    search = {
        pettype: type,
        date: { $lt: Number(currentDoc)}
    }
    
    if(search.pettype == 'all'){
        search.pettype = {$or: ['cat', 'dog']}
    }
    //console.log(search);
    //console.log(currentDoc);
    petModel
    .aggregate()
    .match(search)
    .sort('-date')
    .limit(1)
    .exec(function(err,doc){
        //console.log(doc);
        if(err) {
            console.error(err);
            return res.status(500).send({
                date: moment().format('YYYYMMDDHHmmss'),
                success: false
            });
        }
        else if(doc.length == 0){
            getPetOne(req, type, 0 ,res);
        }
        else {
            return res.status(200).send({
                date:moment().format('YYYYMMDDHHmmss'),
                success: true,
                data: doc
            });
        }   
    });  
}