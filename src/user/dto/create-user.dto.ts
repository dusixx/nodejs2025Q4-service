import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'login123',
    description: 'user login',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  login: string;

  @ApiProperty({
    example: 'password123',
    description: 'user password',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  password: string;
}
