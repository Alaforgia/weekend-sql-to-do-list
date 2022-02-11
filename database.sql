-- create a database on hosted on localhost:5432

-- Database must be named "weekend-to-do-app"


CREATE TABLE "task-list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (100) NOT NULL,
    "notes" VARCHAR (100)
	"completed" BOOLEAN DEFAULT FALSE,
);

INSERT INTO "task-list"
("task", "notes", "completed")

VALUES
('Code weekend challenge', 'Spend time coding! Remember to take breaks', 'No')