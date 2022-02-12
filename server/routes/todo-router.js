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
    INSERT INTO "task-list" ("task", "notes", "isCompleted")
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

toDoRouter.put("/:id", (req, res) => {
  let idToUpdate = req.params.id;
  console.log(idToUpdate);
  console.log(req.body);

  let sqlText = `
  UPDATE "task-list"
  SET "isCompleted" = TRUE
  WHERE "id" = $1;
  `;
  let sqlValues = [idToUpdate];
  pool
    .query(sqlText, sqlValues)
    .then((result) => {
      console.log("PUT WORKS", result);
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("PUT ERROR", err);
      res.sendStatus(500);
    });
});

toDoRouter.delete("/:id", (req, res) => {
  let reqId = req.params.id;
  console.log("DELETE ID", reqId);
  let queryText = 'DELETE FROM "task-list" WHERE "id" = $1;';
  pool
    .query(queryText, [reqId])
    .then((result) => {
      console.log("Task deleted");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Error making database query", queryText, error);
      res.sendStatus(500);
    });
});

module.exports = toDoRouter;
