const express = require('express');
const userService = require('../services/user.service');
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

module.exports = router;