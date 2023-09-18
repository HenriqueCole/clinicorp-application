const { get, post } = require('../../crud/firebase');

async function getUsers() {
  const users = await get('users');
  return users;
}

async function createUser(users){
  const savedUser = await post('users', null, users)
  return savedUser;
}

module.exports = {
  getUsers,
  createUser
};