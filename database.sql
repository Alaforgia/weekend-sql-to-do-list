-- create a database on hosted on localhost:5432

-- Database must be named "weekend-to-do-app"


CREATE TABLE "task-list" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR (30) NOT NULL,
	"complete" VARCHAR (100) NOT NULL,
    "notes" VARCHAR (100)
);