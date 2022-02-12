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

toDoRouter.post("/", (req, res) => {
  const newTask = req.body;
  console.log(newTask);

  const queryText = `
    INSERT INTO "task-list" ("task", "notes", "completed")
    VALUES ($1, $2, $3);
    `;

  //parameterized query below, prevents SQL injection
  pool
    .query(queryText, [newTask.task, newTask.notes, newTask.completed])
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error querying", queryText, err);
      res.sendStatus(500);
    });
});

module.exports = toDoRouter;
