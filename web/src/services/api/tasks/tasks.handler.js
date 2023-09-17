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

async function updateTask(id, tasks){
  const savedTask = await post('tasks', id, tasks)
  return savedTask;
}

async function deleteTask(id){
  const task = await remove('tasks', id);
  return task;
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
};