import { LoginPayload } from '../auth.types';
import { IsEmail, IsString } from 'class-validator';

export class LoginPayloadInput implements LoginPayload {
  @IsEmail()
  email: string;

  @IsString()
  token: string;
}
