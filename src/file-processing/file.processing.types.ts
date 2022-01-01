export enum FileProcessingStatus {
  finished = 'FINISHED',
  processing = 'PROCESSING',
  failed = 'FAILED',
}

export type GetAllFilesRes = Array<{
  fileId: string;
  processingStatus: FileProcessingStatus;
}>;

export type GetFileDetailsRes = {
  fileId: string;
  fileName: string;
  mp3Path: string;
  originalFilePath: string;
  fileLength: number;
  seriesTitle: string | null;
};

export type GetFileSegmentsRes = Array<{
  fileSegmentId: number;
  fileId: string;
  segmentText: string;
  startTime: number;
  endTime: number;
}>;
