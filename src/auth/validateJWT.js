const jwt = require('jsonwebtoken');

const { UserService } = require('../services/user.service');

const SECRET = process.env.JWT_SECRET || 'paralelepipedo';

function extractToken(bearerToken) {
  return bearerToken.split(' ')[1];
}
module.exports = async (req, res, next) => {
  const bearerToken = req.headers('Authorization');

  if (!bearerToken) return res.status(401).json({ error: 'Token não encontrado' });
  const token = extractToken(bearerToken);

  try {
    const decoded = jwt.verify(token, SECRET);
    const user = await UserService.findById(decoded.id);

    if (!user) return res.status(401).json({ error: 'Erro ao procurar usuário do token' });

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};
