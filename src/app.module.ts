import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FileProcessingProxyService } from './file-processing/file.processing.proxy.service';
import { FilesService } from './files/files.service';
import { jwtModule } from './jwt.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { FilesController } from './files/files.controller';
import { JwtStrategy } from './auth/jwt.strategy';
import { UserService } from './users/user.service';

@Module({
  imports: [ConfigModule.forRoot(), jwtModule],
  controllers: [FilesController, AuthController],
  providers: [FileProcessingProxyService, FilesService, AuthService, JwtStrategy, UserService],
})
export class AppModule {}
