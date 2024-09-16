const request = require('supertest');
const app = require('../server'); // Import the app from the server file
const mongoose = require('mongoose');
const User = require('../models/user');
const Post = require('../models/post');

describe('Post Routes', () => {
  let user;
  let token;
  let postId;

  // Set up before each test
  beforeEach(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/test-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});

    // Create a new user
    user = new User({ username: 'testuser', password: 'hashedpassword' });
    await user.save();
    token = user.generateAuthToken(); // Generate token for the user

    // Create a post for testing
    const postResponse = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'This is a test post' });
    postId = postResponse.body._id;
  });

  // Clean up after each test
  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Test for creating a post
  test('should create a new post', async () => {
    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'Another test post' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('content', 'Another test post');
  });

  // Test for retrieving posts
  test('should retrieve all posts', async () => {
    const response = await request(app)
      .get('/api/posts')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test for retrieving a specific post
  test('should retrieve a specific post by ID', async () => {
    const response = await request(app)
      .get(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('content', 'This is a test post');
  });

  // Test for deleting a post
  test('should delete a post', async () => {
    const response = await request(app)
      .delete(`/api/posts/${postId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Post deleted');
  });
});
