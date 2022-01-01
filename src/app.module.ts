import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { FileProcessingProxyService } from './file-processing/file.processing.proxy.service';
import { FilesService } from './files/files.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [FileProcessingProxyService, FilesService],
})
export class AppModule {}
