const express = require("express");
const cors = require("cors");

const tasksRoute = require("./api/tasks/tasks.controller");

const tasksHandler = require("./api/tasks/tasks.handler");

const crud = require("./crud/firebase");

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", tasksRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

