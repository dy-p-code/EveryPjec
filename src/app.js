require('dotenv').config();
const cors = require('cors');
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true
}
const express = require('express');
const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const routes = require('./routes/index.js');
// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require('../swagger-output.json');

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.urlencoded({ extended: false }));
const {
  errorHandler,
  errorLogger,
} = require('./middlewares/error-handler.middleware');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(errorLogger); // Error Handler
app.use(errorHandler); // Error Handler
app.use('/', routes);
module.exports = app;
