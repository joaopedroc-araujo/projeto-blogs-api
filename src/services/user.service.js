const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validateDisplayName, validatePassword, validateEmail } = require('../utils/validateInfos');

const SECRET = process.env.JWT_SECRET || 'paralelepipedo'; // Não faça isso em casa!

const getAll = async () => {
  const users = await User.findAll(
    {
      attributes: { exclude: ['password'] },
    },
  );
  // console.log(users);
  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(
    id, 
    {
      attributes: { exclude: ['password'] },
    },
  );
  return user;
};

const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error('Some required fields are missing');
  }
  
  const user = await User.findOne({ where: { email } });

  if (!user || user.password !== password) {
    throw new Error('Invalid fields');
  }
  
  const token = jwt.sign({ email: user.email }, SECRET);
  
  return { user, token };
};

const userCheck = async (email, password, displayName) => {
  validateDisplayName(displayName);
  validatePassword(password);
  validateEmail(email);

  const user = await User.findOne({ where: { email } }); 
  
  if (user && email === user.email) {
    throw new Error('User already registered');
  }

  const newUser = await User.create({ email, password, displayName });

  const token = jwt.sign({ email: newUser.email }, SECRET);
  return { user: newUser, token };
};
  
module.exports = {
  getAll,
  getById,
  loginUser,
  userCheck,
};
