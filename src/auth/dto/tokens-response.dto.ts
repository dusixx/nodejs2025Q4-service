import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TokensResponseDto {
  @ApiProperty({ description: 'access jwt' })
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({ description: 'refresh jwt' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
