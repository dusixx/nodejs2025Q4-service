import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @ApiProperty({
    description: 'artist name',
  })
  @IsString()
  name?: string;

  @ApiProperty({
    description: 'has the artist been awarded a Grammy',
  })
  @IsBoolean()
  grammy?: boolean;
}
