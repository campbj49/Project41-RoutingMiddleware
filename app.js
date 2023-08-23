//webapp using Intro to Express example code as starting point

const express = require('express');
const itemRoutes = require('./items.js');
const ExpressError = require("./expressError.js")
const db = require('./fakeDb.js');
const app = express();
//enable JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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