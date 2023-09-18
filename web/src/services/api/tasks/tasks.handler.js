const { get, post, getById, remove } = require('../../crud/firebase');

async function getTasks() {
  const tasks = await get('tasks');
  return tasks;
}

async function createTask(tasks){
  const savedTask = await post('tasks', null, tasks)
  return savedTask;
}

async function getTaskById(id){
  const task = await getById('tasks', id);
  return task;
}

async function getTaskByDescription(description){
  const tasks = await get('tasks');
  const task = tasks.find((task) => task.description === description);
  return task;
}

async function updateTask(id, tasks){
  const task = await getById('tasks', id);
  if(task.isBlocked){
    throw {
      message: 'Task is blocked',
      status: 400
    }
  }
  const savedTask = await post('tasks', id, tasks)
  return savedTask;
}

async function deleteTask(id){
  const task = await getById('tasks', id);
  if(task.isBlocked){
    throw {
      message: 'Task is blocked',
      status: 400
    }
  }
  const deletedTask = await remove('tasks', id)
  return deletedTask;
}

async function deleteAllTasks(){
  const tasks = await get('tasks');
  tasks.forEach(async (task) => {
    await remove('tasks', task.id);
  });
}

async function blockTask(id){
  const task = await getById('tasks', id);
  task.isBlocked = true;
  const savedTask = await post('tasks', id, task)
  return savedTask;
}

async function unblockTask(id){
  const task = await getById('tasks', id);
  task.isBlocked = false;
  const savedTask = await post('tasks', id, task)
  return savedTask;
}

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  blockTask,
  unblockTask,
  deleteAllTasks,
  getTaskByDescription
};