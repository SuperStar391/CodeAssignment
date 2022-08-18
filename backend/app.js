var express = require("express");
const cors = require("cors");

var apisRouter = require("./routes/apis");
var app = express();
app.use(cors());
app.use(express.json());
app.use("/api", apisRouter);

module.exports = app;
