const jwt = require('jsonwebtoken');

const { UserService } = require('../services/user.service');

const SECRET = process.env.JWT_SECRET || 'suaSenhaSecreta';

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}

module.exports = async (req, res, next) => {
  const bearerToken = req.headers.authorization;

  if (!bearerToken) return res.status(401).json({ message: 'Token not found' });
  
  const token = extractToken(bearerToken);

  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await UserService.findByPk(decoded.id);

    req.user = user;

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    return res.status(401).json({ message: 'Token not found' });
  }
};
