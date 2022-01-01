import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import got from 'got';
import { GetAllFilesRes, GetFileDetailsRes, GetFileSegmentsRes } from './file.processing.types';

@Injectable()
export class FileProcessingProxyService {
  private get baseUrl(): string {
    return this.configService.get('FILE_PROCESSING_BASE_URL');
  }

  constructor(private readonly configService: ConfigService) {}

  async getAllFilesPaginated(offset = 0, limit = 5): Promise<GetAllFilesRes> {
    return await got
      .get(`file/all`, {
        prefixUrl: this.baseUrl,
        searchParams: { offset, limit },
      })
      .json();
  }

  async getFileDetails(fileId: string): Promise<GetFileDetailsRes> {
    return await got.get(`file/details/${fileId}`, { prefixUrl: this.baseUrl }).json();
  }

  async getFileSegments(fileId: string): Promise<GetFileSegmentsRes> {
    return await got.get(`file/segments/${fileId}`, { prefixUrl: this.baseUrl }).json();
  }
}
