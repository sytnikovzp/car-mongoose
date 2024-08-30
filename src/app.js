const express = require('express');
const cors = require('cors');
// ================================
const {
  errorHandlers: { validationErrorHandler, errorHandler },
} = require('./middlewares');

const {
  time: { getTime, showTime },
} = require('./middlewares');
// ============================
const router = require('./routers');

const app = express();

app.use(
  cors({
    exposedHeaders: ['X-Total-Count'],
  })
);

app.use(express.json());

app.use(getTime, showTime);

// ============================
//  Car shop APP
// ============================
app.use('/api', router);
app.use(validationErrorHandler, errorHandler);

module.exports = app;
