import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccessToken, LoginPayload, User } from './auth.types';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly userService: UserService) {}

  async login(payload: LoginPayload): Promise<AccessToken> {
    // in real world will be replaced with request to database or auth service
    const user = await this.userService.validateLoginPayload(payload);
    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signToken(user);
  }

  renewToken(user: User): AccessToken {
    return this.signToken(user);
  }

  private signToken({ id }: User): AccessToken {
    return {
      accessToken: this.jwtService.sign({ id }),
    };
  }
}
