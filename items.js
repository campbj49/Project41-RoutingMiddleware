const express = require("express");
const router = new express.Router();
const db = require('./fakeDb.js');
const ExpressError = require("./expressError.js")

/** GET /items: get list of itemss */
router.get("/", function(req, res, next) {
  return res.json(items);
});


/** POST /items: add a new item to the shopping list */
router.post("/", function(req, res, next){
  //check that the request has both the name and price of the new item
  let name = req.query.name;
  let price = req.query.price;
  if(!name || !price){
    let error = new ExpressError(`Both name and price are required`, 400)
    return next(error);
  }

  let newItem = new Item(name, price);
  items.push(newItem);
  return res.json({added:newItem});
})

/** GET /items/:name get specific item details */
router.get("/:name" , function(req, res, next) {
  //find item name in list, throwing an error if the item isn't in the list
  let itemFound = items.find((element) => element.name === req.params.name);
  
  if(!itemFound){
    let error = new ExpressError(`Item not found`, 400)
    return next(error);
  }
  return res.json(itemFound);
});

/** PATCH /items/:name update specific item details */
router.patch("/:name" , function(req, res, next) {
  //find item name in list, throwing an error if the item isn't in the list
  let itemFound = items.find((element) => element.name === req.params.name);
  if(!itemFound){
    let error = new ExpressError(`Item not found`, 400)
    return next(error);
  }
  //update item and send succesful message
  itemFound.name = req.query.name;
  itemFound.price = req.query.price;

  return res.json({updated:itemFound});
});

/** DELETE /items/:name delete specific item details */
router.delete("/:name" , function(req, res, next) {
  //throw error if list is empty
  if(!items.length) return next(new ExpressError('List is empty', 400))

  //find item name in list, throwing an error if the item isn't in the list
  let indexFound = items.findIndex((element) => element.name === req.params.name);
  if(indexFound === -1){
    let error = new ExpressError(`Item not found`, 400)
    return next(error);
  }
  //delete item and send succesful message
  items.splice(indexFound);

  return res.json({message:"Deleted"});
});


module.exports = router;

class Item{
  constructor(name,price){
    this.name = name;
    this.price = price;
  }
}