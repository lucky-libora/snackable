import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { GetFileDetailsRes } from '../file-processing/file.processing.types';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';

@Controller('/files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/')
  async getAllProcessedFiles() {
    return await this.filesService.getAllProcessedFiles();
  }

  @Get('/:fileId')
  async getHello(@Param('fileId') fileId: string): Promise<GetFileDetailsRes> {
    return await this.filesService.getFileWithMetadata(fileId);
  }
}
