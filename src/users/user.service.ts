import { Injectable } from '@nestjs/common';
import { LoginPayload, User } from '../auth/auth.types';

@Injectable()
export class UserService {
  // mock data
  private readonly userDataMocks: User[] = [
    {
      id: '7c2a5505-8b63-456d-aec2-d140f166548e',
      email: 'luckylibora@gmail.com',
      token: '123',
    },
    {
      id: '8544c2fb-557b-4998-ab8c-b8a02f43c42e',
      email: 'johnny@snackable.ai',
      token: '123',
    },
  ];

  async validateLoginPayload(payload: LoginPayload): Promise<User | undefined> {
    return this.userDataMocks.find(({ email, token }) => payload.email === email && payload.token === token);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.userDataMocks.find((user) => user.id === id);
  }
}
