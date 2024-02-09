const express = require('express');
const multer = require("multer");
const bodyParser = require('body-parser');
const route = require("./routes/route");
require("dotenv").config();
const app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer().any())
app.use('/uploads', express.static('uploads'));
app.use('/',route)

module.exports = app;