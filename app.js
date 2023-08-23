//webapp using Intro to Express example code as starting point

const express = require('express');
const itemRoutes = require('./items.js');
const db = require('./fakeDb.js');
const app = express();

app.use('/items', itemRoutes);

//global and 404 error handlers from example:
// 404 handler
app.use(function (req, res, next) {
  const notFoundError = new ExpressError("Not Found", 404);
  return next(notFoundError)
});

app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;
  let message = err.message;

  // set the status and alert the user
  return res.status(status).json({
    error: {message, status}
  });
});

//acutally expose the webapp
app.listen(3000, function(){
  console.log('App on port 3000');
})


//ExpressError recomended by example
class ExpressError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
    console.error(this.stack);
  }
}