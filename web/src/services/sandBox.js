const { post } = require("./crud/firebase");

// async function getTasks(res: any) {
//   const tasks = await crud.get("tasks");
//   res.send(tasks);
// }

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