const { BlogPost, Category, User } = require('../models');

const findallPosts = async () => {
  const posts = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      {
        model: Category,
        as: 'categories',
        through: { attributes: [] },
      },
    ],
  });

  return posts;
};

const createPost = async (post, userId) => {
  const { title, content, categoryIds } = post;
  const published = new Date();
  const updated = new Date();
  const createdPost = await BlogPost.create({ title, content, userId, published, updated });
  
  const categories = await Category.findAll({
    where: { id: categoryIds },
  });
    
  await createdPost.addCategories(categories);
    
  return createdPost;
};

module.exports = {
  createPost,
  findallPosts,
};