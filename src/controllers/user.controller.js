const express = require('express');
const userService = require('../services/user.service');
const ERROR_MESSAGE_TO_HTTP_STATUS = require('../utils/ERROR_MESSAGES_STATUS');
// const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token } = await userService.loginUser(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/user', async (req, res) => {
  const { email, password, displayName, image } = req.body;
  try {
    const { token } = await userService.userCheck(email, password, displayName, image);
    res.status(201).json({ token });
  } catch (error) {
    const status = ERROR_MESSAGE_TO_HTTP_STATUS[error.message] || 500;
    res.status(status).json({ message: error.message });
  }
});

module.exports = router;