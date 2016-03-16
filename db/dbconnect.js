var pg = require('pg');

module.exports = function () {
    var conString = process.env.DATABASE_URL || 'postgres://localhost:5432/logincats';
    
    pg.connect(conString, function (err, client, done) {
        if(err) {
            done();
            throw err;
        }
        
        client
        .query('CREATE TABLE IF NOT EXISTS logins(id SERIAL PRIMARY KEY, username VARCHAR(50) not null, password VARCHAR(50) not null, date int not null)');
    });
}