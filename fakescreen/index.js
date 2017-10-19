var express = require('express');
var app = express();
var path = require('path');
var port = 3000;

app.use('/src', express.static(__dirname + '/src'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/pranks/default.html'));
});

app.get('/1', function(req, res) {
    res.sendFile(path.join(__dirname + '/pranks/prank_1.html'));
});

app.listen(port);

console.log('Aplicação rodando na porta:' + port);