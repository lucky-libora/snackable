import { Controller, Get, Param } from '@nestjs/common';
import { FilesService } from './files/files.service';
import { GetFileDetailsRes } from './file-processing/file.processing.types';

@Controller()
export class AppController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/files')
  async getAllProcessedFiles() {
    return await this.filesService.getAllProcessedFiles();
  }

  @Get('/files/:fileId')
  async getHello(@Param('fileId') fileId: string): Promise<GetFileDetailsRes> {
    return await this.filesService.getFileWithMetadata(fileId);
  }
}
