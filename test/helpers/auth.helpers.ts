import * as request from 'supertest';

export async function getAuthorizationToken(server: any, email: string, token: string) {
  const res = await request(server).post('/auth/login').send({
    email,
    token,
  });

  return `Bearer ${res.body.accessToken}`;
}

export async function getValidAuthorizationToken(server: any) {
  return await getAuthorizationToken(server, 'luckylibora@gmail.com', '123');
}
