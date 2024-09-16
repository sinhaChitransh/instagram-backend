const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  const { content } = req.body;

  const post = new Post({
    user: req.user._id,
    content,
  });

  const createdPost = await post.save();
  res.status(201).json(createdPost);
};

exports.getPosts = async (req, res) => {
  const posts = await Post.find({ user: req.user._id });
  res.json(posts);
};

exports.deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (post) {
    await post.remove();
    res.json({ message: 'Post removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
};
