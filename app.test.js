const request = require('supertest');
const app = require('./app');

describe('App', () => {
  test('should return 200', async () => {
    const response = await request(app).get('/v1/A00');
    expect(response.statusCode).toBe(200);
  });
});
