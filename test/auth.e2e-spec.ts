import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { getAuthorizationToken, getValidAuthorizationToken } from './helpers/auth.helpers';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // NOTE no overriding anything, because UserService is already a mock
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth/login (POST)', () => {
    it('should return created token', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send({
        email: 'luckylibora@gmail.com',
        token: '123',
      });

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('accessToken');
    });

    it('should return 401 error if credentials are invalid', async () => {
      const res = await request(app.getHttpServer()).post('/auth/login').send({
        email: 'luckylibora@gmail.com',
        token: 'not-valid-password',
      });

      expect(res.status).toBe(401);
    });
  });

  describe('/auth/renew (POST)', () => {
    it('should return a new accessToken', async () => {
      const server = app.getHttpServer();
      const authorizationToken = await getValidAuthorizationToken(server);
      const res = await request(server).post('/auth/renew').set('authorization', authorizationToken);
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('accessToken');
    });
  });
});
