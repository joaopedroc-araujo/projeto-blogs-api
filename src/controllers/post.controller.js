const express = require('express');
const postService = require('../services/post.service');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.get('/post', validateJWT, async (_req, res) => {
  try {
    const posts = await postService.findallPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

router.post('/post', validateJWT, async (req, res) => {
  const { title, content, categoryIds } = req.body;

  if (!categoryIds) {
    res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const newPost = { title, content, categoryIds };

  if (!newPost) return res.status(400).json({ message: 'Some required fields are missing' });

  try {
    const post = await postService.createPost(newPost);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
