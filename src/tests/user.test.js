const request = require('supertest');
const app = require('../server'); // Import the app from the server file
const mongoose = require('mongoose');
const User = require('../models/user');

describe('User Routes', () => {
  let token;
  let userId;

  // Set up before each test
  beforeEach(async () => {
    // Connect to the test database
    await mongoose.connect('mongodb://localhost:27017/test-db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});

    // Create a new user
    const userResponse = await request(app)
      .post('/api/users/register')
      .send({ username: 'testuser', password: 'password123' });

    userId = userResponse.body._id;
    token = userResponse.body.token; // Assuming the registration response includes a token
  });

  // Clean up after each test
  afterEach(async () => {
    await mongoose.disconnect();
  });

  // Test for user registration
  test('should register a new user', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'newuser', password: 'newpassword123' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('username', 'newuser');
  });

  // Test for user login
  test('should login a user', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  // Test for retrieving user profile
  test('should retrieve user profile', async () => {
    const response = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });

  // Test for updating user details
  test('should update user profile', async () => {
    const response = await request(app)
      .put(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'updateduser' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'updateduser');
  });
});
