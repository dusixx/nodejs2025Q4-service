import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RefreshTokenDto {
  @ApiProperty({ description: 'refresh jwt' })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
