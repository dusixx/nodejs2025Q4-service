import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { Album } from '../../album/types';
import { Artist } from '../../artist/types';
import { Track } from '../../track/types';
import { FavsResponse } from '../types';
import { AlbumResponseDto } from '../../album/dto/album-response.dto';
import { ArtistResponseDto } from '../../artist/dto/artist-response.dto';
import { TrackResponseDto } from '../../track/dto/track-response.dto';

export class FavsResponseDto implements FavsResponse {
  @ApiProperty({
    description: 'array of favorite artists',
    type: [ArtistResponseDto],
  })
  @IsArray()
  artists: Artist[];

  @ApiProperty({
    description: 'array of favorite albums',
    type: [AlbumResponseDto],
  })
  @IsArray()
  albums: Album[];

  @ApiProperty({
    description: 'array of favorite tracks',
    type: [TrackResponseDto],
  })
  @IsArray()
  tracks: Track[];
}
