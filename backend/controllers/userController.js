const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const roles = require('../constants/roles');

async function register(login, password) {
  if (!password) {
    throw new Error('Password is empty');
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user._id });

  return { user, token };
}

async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error('Wrong password');
  }

  const token = generate({ id: user._id });
  return { user, token };
}

function getUsers() {
  return User.find();
}

function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

function updateUser(id, data) {
  return User.findByIdAndUpdate(id, data, { returnDocument: 'after' });
}

function getRoles() {
  return [
    { id: roles.ADMIN, name: 'Admin' },
    { id: roles.USER, name: 'User' },
    { id: roles.GUEST, name: 'Guest' },
  ];
}

module.exports = {
  register,
  login,
  getUsers,
  deleteUser,
  updateUser,
  getRoles,
};
