import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsPositive, IsString, ValidateIf } from 'class-validator';
import { validate } from 'uuid';
import { Album } from '../types';

export class CreateAlbumDto implements Omit<Album, 'id'> {
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
