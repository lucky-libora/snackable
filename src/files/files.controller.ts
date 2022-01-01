import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { FilesService } from './files.service';
import { GetFileDetailsRes } from '../file-processing/file.processing.types';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { GetFileMetadataParams } from './dto/get.file.metadata.params';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('/files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('/')
  async getAllProcessedFiles() {
    return await this.filesService.getAllProcessedFiles();
  }

  @Get('/:fileId')
  async getFileMetadata(@Param() { fileId }: GetFileMetadataParams): Promise<GetFileDetailsRes> {
    return await this.filesService.getFileWithMetadata(fileId);
  }
}
