const express = require("express");
const cors = require("cors");

const tasksRoute = require("./api/tasks/tasks.controller");
const usersRoute = require("./api/users/users.controller");

const port = 3001;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", tasksRoute);
app.use("/api", usersRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

