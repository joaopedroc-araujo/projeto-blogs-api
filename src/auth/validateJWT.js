const jwt = require('jsonwebtoken');

const { User } = require('../models');

const SECRET = process.env.JWT_SECRET || 'paralelepipedo';

function extractToken(bearerToken) {
  const parts = bearerToken.split(' ');
  if (parts.length === 2 && parts[0] === 'Bearer') {
    return parts[1];
  }
  return null;
}
module.exports = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  
  if (!bearerToken) {
    return res.status(401).json({ message: 'Token not found' });
  }
  
  const token = extractToken(bearerToken);
  
  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    
    if (!user) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};
