import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, IsUUID, ValidateIf } from 'class-validator';
import { validate } from 'uuid';
import { UUID_VER } from '../../common/constants';
import { Album } from '../types';

export class AlbumResponseDto implements Album {
  @ApiProperty({ description: 'uuid v4' })
  @IsUUID(UUID_VER)
  id: string;

  @ApiProperty({ description: 'album name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'album name' })
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  year: number;

  @ApiProperty({ description: 'uuid v4 or null' })
  @ValidateIf((_, v) => v === null || validate(String(v)))
  artistId: string | null;
}
