var pg = require('pg');
var moment = require('moment');

module.exports = function (id, res) {
    var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/logincats';
    
    pg.connect(conString, function (err, client, done) {
        if(err) {
            done();
            return res.status(500).send({
                success: false,
                date: moment().format('YYYYMMDD')
            });
        }
        var result = [];
        var queryString = "SELECT * FROM logins WHERE username = '" + id + "'";
        var query = client.query(queryString);
        
        query.on('row', function (row) {
            result.push(row);
        });
        query.on('end', function () {
            if (!result.length) {
                done();
                return res.status(200).send({
                    success: false,
                    date: moment().format('YYYYMMDD')
                });
            }
            else if(result.length == 1){
                done();
                return res.status(200).send({
                    success: true,
                    date: moment().format('YYYYMMDD')
                })
            }
        })
        
    });
}