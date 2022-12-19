require('dotenv').config();
const express = require('express');
const routes = require('./routes/index.js');
const { errorHandler, errorLogger } = require('./middlewares/error-handler.middleware');
//const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

//app.use(cookieParser());
app.use('/', routes);

// Error 핸들러
app.use(errorLogger);
app.use(errorHandler);

module.exports = app