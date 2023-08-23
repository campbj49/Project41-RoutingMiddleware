const express = require("express");
const router = new express.Router();
const db = require('./fakeDb.js');

/** GET /items: get list of itemss */

router.get("/", function(req, res) {
  return res.json({item:"placeholder"});
});

/** DELETE /users/[id]: delete user, return status */

router.delete("/:id", function(req, res) {
  const idx = users.findIndex(u => u.id === +req.params.id);
  users.splice(idx, 1);
  return res.json({ message: "Deleted" });
});


module.exports = router;