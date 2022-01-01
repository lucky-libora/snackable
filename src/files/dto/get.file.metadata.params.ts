import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetFileMetadataParams {
  @IsUUID()
  @ApiProperty()
  fileId: string;
}
