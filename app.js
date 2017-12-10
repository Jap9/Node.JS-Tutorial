/*
Define and init Express and JSON parser modules
Use routes defined under '/api' on './routes' folder
Export 'app' to be used on 'index.js'
*/

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', api);

module.exports = app;