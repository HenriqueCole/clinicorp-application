const { post } = require("./crud/firebase");

async function createTask() {
  const task = {
    description: "test",
    status: "To Do",
    responsible: "test",
    createdBy: "test",
    isBlocked: false,
    priority: "Baixa",
  };

  const savedTask = await post("tasks", null, task);
  return savedTask;
  }

  createTask();