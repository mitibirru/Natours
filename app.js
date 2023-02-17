const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
// console.log(process.env);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// express.json() is a function acts as a middleware, which passes the request body to express api by exposing post request.
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// START SERVER
module.exports = app;

// MONGO = mongodb+srv://mitibirru:mitibirru@cluster0.oi6cumz.mongodb.net/booking
