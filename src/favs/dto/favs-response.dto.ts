import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Album } from '../../album/types';
import { Artist } from '../../artist/types';
import { Track } from '../../track/types';
import { FavsResponse } from '../types';

export class FavsResponseDto implements FavsResponse {
  @ApiProperty({ description: 'array of favorite artists' })
  @IsArray()
  artists: Artist[];

  @ApiProperty({ description: 'array of favorite albums' })
  @IsArray()
  albums: Album[];

  @ApiProperty({ description: 'array of favorite tracks' })
  @IsArray()
  tracks: Track[];
}
