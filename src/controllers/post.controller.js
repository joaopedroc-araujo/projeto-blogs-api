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

router.get('/post/:id', validateJWT, async (req, res) => {
  try {
    const post = await postService.findPostById(req.params.id);
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
});

router.post('/post', async (req, res) => {
  const { title, content, categoryIds } = req.body;

  if (!title || !content || !categoryIds) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  try {
    const post = await postService.createPost({ title, content, categoryIds }, req.user.id);
    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
