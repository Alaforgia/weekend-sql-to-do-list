const express = require("express");
const toDoRouter = express.Router();

// DB CONNECTION
const pool = require("../modules/pool");

// GET
toDoRouter.get("/", (req, res) => {
  let queryText = 'SELECT * FROM "task-list"';
  console.log("GETTING?!");
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("GET ERROR", error);
      res.sendStatus(500);
    });
});

module.exports = toDoRouter;
