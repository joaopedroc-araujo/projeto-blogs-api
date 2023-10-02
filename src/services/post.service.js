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

const findPostById = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'displayName', 'email', 'image'],
      },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });

  if (!post) {
    throw new Error('Post does not exist');
  }

  return post;
};

const createPost = async (post, userId) => {
  const { title, content, categoryIds } = post;
  const published = new Date();
  const updated = new Date();

  const createdPost = await BlogPost.create({ title, content, userId, published, updated });
  console.log(createdPost);
  const categories = await Category.findAll({
    where: { id: categoryIds },
  });
  console.log(categories);

  if (categories.length !== categoryIds.length) {
    throw new Error('one or more "categoryIds" not found');
  }

  await createdPost.addCategories(categories);

  return createdPost;
};

module.exports = {
  createPost,
  findPostById,
  findallPosts,
};