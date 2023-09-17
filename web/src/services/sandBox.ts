import crud from "./crud/firebase";

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
  };

  const savedTask = await crud.post("tasks", null, task);
  return savedTask;
  }

  createTask();