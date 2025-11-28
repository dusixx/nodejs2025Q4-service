import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Artist } from '../types';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @ApiProperty({
    example: 'apocalyptica',
    description: 'artist name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
