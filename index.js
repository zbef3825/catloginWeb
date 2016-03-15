var express  = require('express');
app = express();

PORT = process.env.PORT || 3000;

app.use('/', express.static(__dirname + '/public'));

app.get('/api/login', function(req, res){
    
});

app.listen(PORT);