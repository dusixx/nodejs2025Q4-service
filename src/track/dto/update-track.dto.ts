import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNotEmpty, IsPositive, IsString, ValidateIf } from 'class-validator';
import { validate } from 'uuid';
import { Track } from '../types';

export class UpdateTrackDto implements Omit<Track, 'id'> {
  @ApiProperty({ description: 'track name' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'uuid v4 or null' })
  @ValidateIf((_, v) => v === null || validate(String(v)))
  artistId: string | null;

  @ApiProperty({ description: 'uuid v4 or null' })
  @ValidateIf((_, v) => v === null || validate(String(v)))
  albumId: string | null;

  @ApiProperty({ description: 'track duration (sec)' })
  @IsDefined()
  @IsInt()
  @IsPositive()
  duration: number;
}
