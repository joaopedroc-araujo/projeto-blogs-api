const express = require('express');
const categoryService = require('../services/category.service');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/categories', validateJWT, async (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  
  try {
    const newCategory = await categoryService.addCategory(name);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
