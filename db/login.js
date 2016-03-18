var pg = require('pg');
var moment = require('moment');
var jwt = require('jsonwebtoken');

module.exports = function (req, res) {
    var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/logincats';
    
    pg.connect(conString, function (err, client, done) {
        if(err || req.username == undefined || req.password == undefined) {
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
            if (result.length == 1 && result[0].username == req.username && result[0].password == req.password) {
                done();
                if (result[0].admin == true) {
                    var Usertoken = jwt.sign({username: req.username, expiresIn: "99h", admin: "true"}, 'example')
                }
                else {
                    var Usertoken = jwt.sign({username: req.username, expiresIn: "10h"}, 'example');
                }
                
                return res.status(200).send({
                    success: true,
                    date: moment().format('YYYYMMDD'),
                    token: Usertoken
                });
            }
            else {
                done();
                return res.status(200).send({
                    success: false,
                    date: moment().format('YYYYMMDD')
                })
            }
        })
        
    });
}