import { GetFileDetailsRes, GetFileSegmentsRes } from '../file-processing/file.processing.types';

export type FileMetadata = GetFileDetailsRes & {
  segmentsMeta: GetFileSegmentsRes;
};
