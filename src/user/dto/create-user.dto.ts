import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'some login',
    description: 'user login',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  login: string;

  @ApiProperty({
    example: 'pass123',
    description: 'user password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
