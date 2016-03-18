var mongoose = require('mongoose');

mongoose.connect("mongodb://admin:admin@ds015879.mlab.com:15879/petdb", function (err) {
    if(err) throw err;
})

var Schema = mongoose.Schema;

var petSchema = new Schema({
    imglink: String,
    likedUser: [String],
    upvote: Number,
    report: Boolean,
    reportcomment: [String],
    date: Number,
    pettype: String,
    photocomment: [Schema.Types.Mixed],
    photocommentnum: Number
    });	
    
var petModel = mongoose.model('pets', petSchema);

module.exports = petModel