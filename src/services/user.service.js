const jwt = require('jsonwebtoken');
const { User } = require('../models');

const SECRET = process.env.JWT_SECRET || 'paralelepipedo'; // Não faça isso em casa!

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
  
module.exports = {
  loginUser,
};
