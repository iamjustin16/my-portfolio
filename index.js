var express = require('express');
var app = express();
var path = require('path');
var port = 1226;

app.use(express.static("webapp"));

app.get("/", (req, res) => {
    res.sendfile(path.join(__dirname + "/index.html"));
});

app.listen(port, () => {
    console.log("running in port " + port);
});