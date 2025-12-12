import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: 'refresh jwt' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
