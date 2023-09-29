const { Category } = require('../models');

const getCategories = async () => {
  const categories = await Category.findAll({ 
    order: [['id', 'ASC']],
    raw: true });
  
  return categories;
};

const addCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

module.exports = {
  getCategories,
  addCategory,
};
