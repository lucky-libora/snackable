import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const jwtModule = JwtModule.registerAsync({
  inject: [ConfigService],
  imports: [ConfigModule.forRoot()],
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get('JWT_EXPIRES_IN'),
      },
    };
  },
});
