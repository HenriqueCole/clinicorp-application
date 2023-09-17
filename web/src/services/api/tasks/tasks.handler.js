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

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask
};