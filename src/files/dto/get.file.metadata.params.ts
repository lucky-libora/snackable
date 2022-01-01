import { IsUUID } from 'class-validator';

export class GetFileMetadataParams {
  @IsUUID()
  fileId: string;
}
