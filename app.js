//webapp using Intro to Express example code as starting point

const express = require('express');

const app = express();

app.get('/mean', function(request, response, next) {
    //throw an error if the query is empty
    if(!request.query.nums){
        noNums = new ExpressError(`Numbers are required`, 400)
        return next(noNums);
    }
    //split query on commas
    let numList = request.query.nums.split(',');
    let total = 0;
    for(number of numList){
        let num = Number(number);
        total += num;
        //throw an error if non numbers are in the query
        if(Number.isNaN(num)){
            notNum = new ExpressError(`${number} is not a number`, 400)
            return next(notNum);
        }
    }
    value = total/numList.length;
    return response.json({
        operation: "mean",
        value: value
    });//request.query);
});

app.get('/median', function(request, response, next) {
    //throw an error if the query is empty
    if(!request.query.nums){
        noNums = new ExpressError(`Numbers are required`, 400)
        return next(noNums);
    }
    //split query on commas
    let numList = request.query.nums.split(',');
    //check that all the items in the list are numbers
    for(number of numList){
        let num = Number(number);
        //throw an error if non numbers are in the query
        if(Number.isNaN(num)){
            notNum = new ExpressError(`${number} is not a number`, 400)
            return next(notNum);
        }
    }
    value = numList[Math.floor(numList.length/2)];
    return response.json({
        operation: "median",
        value: value
    });//request.query);
});

app.get('/mode', function(request, response, next) {
    //throw an error if the query is empty
    if(!request.query.nums){
        noNums = new ExpressError(`Numbers are required`, 400)
        return next(noNums);
    }
    //split query on commas
    let numList = request.query.nums.split(',');
    //compare all the counts of the numbers in the list, defaulting to the first one found
    let value = {val:0, count:0}
    for(number of numList){
        let num = Number(number);
        let count = numList.filter(item=>item === number).length;
        if(count > value.count) value = {val:num, count:count};
        //throw an error if non numbers are in the query
        if(Number.isNaN(num)){
            notNum = new ExpressError(`${number} is not a number`, 400)
            return next(notNum);
        }
    }
    return response.json({
        operation: "mode",
        value: value.val
    });//request.query);
});

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