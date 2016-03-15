var pg = require('pg');
var moment = require('moment');

module.exports = function(req, res){
    
    var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/logincats';
    
    var data = {
            username: req.username,
            password:  req.password,
            date: moment().format('YYYYMMDD')
        }
    
    pg.connect(conString, function(err, client, done) {
        if(err){
            done();
            return res.status(500).send({
                date: moment().format('YYYYMMDD'),
                succuess: false
            });
        }
        
        var query = client.query("INSERT INTO logins(username, password, date) VALUES($1, $2, $3)", [data.username, data.password, data.date]);
        
        query.on('end', function () {
            done();
            return res.status(200).send({
                date: moment().format('YYYYMMDD'),
                success: true
            })
        })
    });  
}