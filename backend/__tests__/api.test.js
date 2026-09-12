process.env.JWT_SECRET = 'test_jwt_secret';
process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app } = require('../app');
const User = require('../models/user');
const Card = require('../models/card');

let mongoServer;

const getCsrfToken = async (agent) => {
  const response = await agent.get('/csrf-token').expect(200);
  return response.body.csrfToken;
};

const signupAndLogin = async (agent, email) => {
  const password = 'password123';
  let csrfToken = await getCsrfToken(agent);

  await agent
    .post('/signup')
    .set('X-CSRF-Token', csrfToken)
    .send({ email, password })
    .expect(201);

  csrfToken = await getCsrfToken(agent);

  await agent
    .post('/signin')
    .set('X-CSRF-Token', csrfToken)
    .send({ email, password })
    .expect(200);

  return getCsrfToken(agent);
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterEach(async () => {
  await User.deleteMany({});
  await Card.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('API auth and CSRF', () => {
  test('rejects unsafe requests without CSRF token', async () => {
    await request(app)
      .post('/signup')
      .send({ email: 'csrf@example.com', password: 'password123' })
      .expect(403);
  });

  test('signs up, signs in and returns current user', async () => {
    const agent = request.agent(app);
    await signupAndLogin(agent, 'user@example.com');

    const response = await agent.get('/users/me').expect(200);

    expect(response.body.email).toBe('user@example.com');
    expect(response.body.password).toBeUndefined();
  });
});

describe('Cards API', () => {
  test('creates, likes and removes like from a card', async () => {
    const agent = request.agent(app);
    let csrfToken = await signupAndLogin(agent, 'cards@example.com');

    const createResponse = await agent
      .post('/cards')
      .set('X-CSRF-Token', csrfToken)
      .send({ name: 'Test card', link: 'https://example.com/image.jpg' })
      .expect(201);

    const cardId = createResponse.body._id;

    csrfToken = await getCsrfToken(agent);
    const likeResponse = await agent
      .put(`/cards/${cardId}/likes`)
      .set('X-CSRF-Token', csrfToken)
      .expect(200);

    expect(likeResponse.body.likes).toHaveLength(1);

    csrfToken = await getCsrfToken(agent);
    const dislikeResponse = await agent
      .delete(`/cards/${cardId}/likes`)
      .set('X-CSRF-Token', csrfToken)
      .expect(200);

    expect(dislikeResponse.body.likes).toHaveLength(0);
  });

  test('forbids deleting another user card', async () => {
    const ownerAgent = request.agent(app);
    const ownerCsrfToken = await signupAndLogin(ownerAgent, 'owner@example.com');

    const createResponse = await ownerAgent
      .post('/cards')
      .set('X-CSRF-Token', ownerCsrfToken)
      .send({ name: 'Owner card', link: 'https://example.com/image.jpg' })
      .expect(201);

    const anotherAgent = request.agent(app);
    const anotherCsrfToken = await signupAndLogin(anotherAgent, 'another@example.com');

    await anotherAgent
      .delete(`/cards/${createResponse.body._id}`)
      .set('X-CSRF-Token', anotherCsrfToken)
      .expect(403);

    const card = await Card.findById(createResponse.body._id);
    expect(card).not.toBeNull();
  });
});
