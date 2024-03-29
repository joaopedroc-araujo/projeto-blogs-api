const express = require('express');
const userService = require('../services/user.service');
const ERROR_MESSAGE_TO_HTTP_STATUS = require('../utils/ERROR_MESSAGES_STATUS');
const validateJWT = require('../auth/validateJWT');

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

router.get('/user', validateJWT, async (req, res) => {
  try {
    const users = await userService.getAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/user/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userService.getById(id);
    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
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