import 'jest';
import express from 'express';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import IntegrationHelpers from '../../../../test/helpers/Integration-helpers';
import { AppDataSource } from '../../../../database/data-source';
import bcrypt from 'bcrypt';
import { enableFetchMocks } from 'jest-fetch-mock';
import { User } from '../../../user/entities/user.entity';

enableFetchMocks();
const userRepository = AppDataSource.getRepository(User);

describe('auth integration tests', () => {
  let app: express.Application;
  const contentType: string = 'application/json; charset=utf-8';
  const userData = {
    name: 'Sample User',
    email: 'user@email.com',
    mobile: '+15875302271',
    password: bcrypt.hashSync('password', 10),
  };

  beforeAll(async () => {
    app = await IntegrationHelpers.getApp();
    await AppDataSource.initialize()
      .then(() => console.log('Typeorm successfully initialized'))
      .catch((error) => console.log(`unable to initialize typeorm ${error}`));

    userRepository.deleteAll();

    fetchMock.mockResponse(
      JSON.stringify({
        status: 'queued',
        sid: 'sid',
      }),
    );
  });

  afterAll((done) => {
    done();
  });

  // Register
  it('register with incomplete data', async () => {
    await request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .expect('Content-Type', contentType)
      .expect((res: request.Response) => {
        expect(res.body.status).toEqual('error');
        expect(res.body.data).toEqual(null);
        expect(res.body.message).toContain('name should not be empty');
      })
      .expect(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it('register with correct data', async () => {
    await request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send(userData)
      .expect('Content-Type', contentType)
      .expect((res: request.Response) => {
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toEqual('Registration successful');
        expect(res.body.data.name).toEqual(userData.name);
        expect(res.body.data.email).toEqual(userData.email);
        expect(res.body.data.mobile).toEqual(userData.mobile);
      })
      .expect(StatusCodes.CREATED);
  });

  it('register with existing user data', async () => {
    const updatedUserData = { ...userData, email: 'user2@email.com' };
    const user = await userRepository.create(updatedUserData);
    await userRepository.save(user);

    await request(app)
      .post('/api/register')
      .set('Accept', 'application/json')
      .send(updatedUserData)
      .expect('Content-Type', contentType)
      .expect((res: request.Response) => {
        expect(res.body.status).toEqual('error');
        expect(res.body.message).toEqual('User account already exist');
        expect(res.body.data).toEqual(null);
      })
      .expect(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  // Login
  it('login with incomplete data', async () => {
    await request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ password: 'password' })
      .expect('Content-Type', contentType)
      .expect((res: request.Response) => {
        expect(res.body.status).toEqual('error');
        expect(res.body.data).toEqual(null);
        expect(res.body.message).toContain('email should not be empty');
      })
      .expect(StatusCodes.UNPROCESSABLE_ENTITY);
  });

  it('login with correct data', async () => {
    const updatedUserData = { ...userData, email: 'user5@email.com', mobile: '+14735227496' };
    const user = await userRepository.create(updatedUserData);
    await userRepository.save(user);

    await request(app)
      .post('/api/login')
      .set('Accept', 'application/json')
      .send({ email: updatedUserData.email, password: 'password' })
      .expect('Content-Type', contentType)
      .expect((res: request.Response) => {
        expect(res.body.status).toEqual('success');
        expect(res.body.message).toContain('Complete login by providing code sent to your mobile at this URL');
      })
      .expect(StatusCodes.OK);
  });
});
