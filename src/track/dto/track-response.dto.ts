import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  ValidateIf,
} from 'class-validator';
import { validate } from 'uuid';
import { UUID_VER } from '../../common/constants';
import { TrackEntity } from '../entities/track.entity.js';

export class TrackResponseDto implements TrackEntity {
  @ApiProperty({ description: 'uuid v4' })
  @IsUUID(UUID_VER)
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

  @IsBoolean()
  isFavorite: boolean;
}
