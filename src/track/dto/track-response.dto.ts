import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, IsUUID, ValidateIf } from 'class-validator';
import { validate } from 'uuid';
import { Track } from '../types';

export class TrackResponseDto implements Track {
  @ApiProperty({ description: 'uuid v4' })
  @IsUUID(4)
  id: string;

  @ApiProperty({ description: 'track name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'uuid v4 or null' })
  @ValidateIf((_, v) => v === null || validate(String(v)))
  artistId: string | null;

  @ApiProperty({ description: 'uuid v4 or null' })
  @ValidateIf((_, v) => v === null || validate(String(v)))
  albumId: string | null;

  @ApiProperty({ description: 'track duration (sec)' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  duration: number;
}
