const express = require('express')
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routes');
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(routes)
app.use(errorHandler);

module.exports = app

