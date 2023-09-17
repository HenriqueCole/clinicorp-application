const express = require("express");
const router = express.Router();

const tasksHandler = require("./tasks.handler");

router.post("/tasks", async (req, res) => {
  tasksHandler.createTask(req.body)
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

router.get("/tasks", async (req, res) => {
  tasksHandler.getTasks(res)
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

router.get("/tasks/:id", async (req, res) => {
  tasksHandler.getTaskById(req.params.id)
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

router.put("/tasks/:id", async (req, res) => {
  tasksHandler.updateTask(req.params.id, req.body)
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});


router.delete("/tasks/:id", async (req, res) => {
  tasksHandler.deleteTask(req.params.id)
  .then((result) => {
    res.status(200).json(result);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

module.exports = router;
