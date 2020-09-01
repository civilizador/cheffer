import request from 'supertest';
import { app } from '../../app';

// Create a new user

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201);
});

// Request format validation:

// 1. Invalid Email
it('returns a 400 if email is not valid', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
      password: 'password'
      })
      .expect(400);
});

// 2.   Invalid PAssword
it('returns a 400 if password is not valid', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
      password: ''
      })
      .expect(400);
});

// Missing password or email 

it('returns a 400 if password and email is missing', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com'
      })
      .expect(400);
    await request(app)
      .post('/api/users/signup')
      .send({
        password: 'password'
      })
      .expect(400);
});

// Dublicate emails are not allowed

it('disallows duplicate emails', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400);
  });
  
  it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    expect(response.get('Set-Cookie')).toBeDefined();
  });
  