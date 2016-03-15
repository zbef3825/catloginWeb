var pg = require('pg');
var moment = require('moment');

module.exports = function (req, res) {
    var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/logincats';
    
    pg.connect(conString, function (err, client, done) {
        if(err || req.username == undefined) {
            done();
            return res.status(500).send({
                success: false,
                date: moment().format('YYYYMMDD')
            });
        }
        var result = [];
        var queryString = "SELECT * FROM logins WHERE username = '" + req.username + "'";
        var query = client.query(queryString);
        
        query.on('row', function (row) {
            result.push(row);
        });
        query.on('end', function () {
            if (!result.length) {
                return res.status(400).send({
                    success: false,
                    date: moment().format('YYYYMMDD')
                });
            }
            else {
                return res.status(200).send({
                    success: true,
                    date: moment().format('YYYYMMDD')
                })
            }
        })
        
    });
}