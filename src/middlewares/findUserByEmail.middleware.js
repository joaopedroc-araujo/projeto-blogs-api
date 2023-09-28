const User = require('../models/User');

function findUserByEmail(req, res, next) {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
  
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid fields' });
      }
  
      req.user = user;
      next();
    })
    .catch((error) => {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error', error: error.message });
    });
}

module.exports = findUserByEmail;