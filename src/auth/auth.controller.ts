import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AccessToken, LoginPayload } from './auth.types';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.auth.guard';
import { LoginPayloadInput } from './dto/login.payload.input';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: LoginPayloadInput): Promise<AccessToken> {
    return this.authService.login(user);
  }

  @Post('/renew')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async renewToken(@Req() req): Promise<AccessToken> {
    return this.authService.renewToken(req.user);
  }
}
