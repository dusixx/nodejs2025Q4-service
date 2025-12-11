import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { UUID_VER } from '../../common/constants';
import { ArtistEntity } from '../entities/artist.entity.js';

export class ArtistResponseDto implements ArtistEntity {
  @ApiProperty({ description: 'uuid v4' })
  @IsUUID(UUID_VER)
  id: string;

  @ApiProperty({ description: 'artist name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'has the artist been awarded a Grammy' })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;

  @IsBoolean()
  isFavorite: boolean;
}
