"use strict";
exports.__esModule = true;
var express = require("express");
var routes_1 = require("./routes");
var app = express();
var port = 8080;
app.use(express.json());
app.use("/words", routes_1["default"]);
app.listen(port, function (err) {
    console.log("server is listening on " + port);
});
