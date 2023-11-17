if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const cors = require('cors');
const express = require('express');
const app = express();
const route = require('./routers');
const errorHandler = require('./middlewares/errHandler');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(route);
app.use(errorHandler);

module.exports = app;
