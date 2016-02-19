var express = require("express");
var app = express();
var port = Number(process.env.PORT || 3000);
var ip = "127.0.0.1";

app.use(express.static(__dirname + "/client"));

app.get('/', function(req, res) {
  res.redirect('/');
});

app.listen(port);
console.log("Server now listening on port " + port);