import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Artist } from '../types';

export class CreateArtistDto implements Omit<Artist, 'id'> {
  @ApiProperty({ description: 'artist name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'has the artist been awarded a Grammy' })
  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
