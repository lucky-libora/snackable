import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { FileProcessingProxyService } from '../file-processing/file.processing.proxy.service';
import { FileProcessingStatus, GetAllFilesRes } from '../file-processing/file.processing.types';
import { FileMetadata } from './file.types';

@Injectable()
export class FilesService {
  private defaultLimit = 5;

  constructor(private readonly fileProcessingProxyService: FileProcessingProxyService) {}

  async getAllProcessedFiles(offset = 0): Promise<GetAllFilesRes> {
    const res = await this.fileProcessingProxyService.getAllFilesPaginated(offset);
    if (!res?.length) {
      return [];
    }

    const processedFiles = res.filter(({ processingStatus }) => processingStatus === FileProcessingStatus.finished);

    return [...processedFiles, ...(await this.getAllProcessedFiles(offset + this.defaultLimit))];
  }

  async getFileWithMetadata(fileId: string): Promise<FileMetadata> {
    const processingStatus = await this.getFileStatus(fileId);
    if (!processingStatus) {
      throw new NotFoundException('Requested file is not found');
    }

    if (processingStatus !== FileProcessingStatus.finished) {
      throw new BadRequestException('Requested file is not processed');
    }

    const [file, segmentsMeta] = await Promise.all([
      this.fileProcessingProxyService.getFileDetails(fileId),
      this.fileProcessingProxyService.getFileSegments(fileId),
    ]);

    return {
      ...file,
      segmentsMeta,
    };
  }

  private async getFileStatus(fileId: string, offset = 0): Promise<FileProcessingStatus | null> {
    const res = await this.fileProcessingProxyService.getAllFilesPaginated(offset);
    if (!res?.length) {
      return null;
    }

    const file = res.find((file) => file.fileId === fileId);
    if (!file) {
      return await this.getFileStatus(fileId, offset + this.defaultLimit);
    }

    return file.processingStatus;
  }
}
