import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'oldPass123',
    description: 'current password',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'pass123',
    description: 'new password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  newPassword: string;
}
