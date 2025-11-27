import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUUID,
  Min,
  MinLength,
} from 'class-validator';
import { UserWithoutPassword } from '../types';

export class UserResponseDto implements UserWithoutPassword {
  @ApiProperty({
    example: 'b50da10c-2059-4002-b75a-a11d8ad309a1',
    description: 'user uuid v4',
  })
  @IsUUID(4)
  id: string;

  @ApiProperty({
    example: 'some login',
    description: 'user login',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  login: string;

  @ApiProperty({
    example: 1,
    description: 'version number (1..N)',
  })
  @IsInt()
  @IsPositive()
  @Min(1)
  @Type(() => Number)
  version: number;

  @ApiProperty({
    example: 1764220526750,
    description: 'creation timestamp',
  })
  @IsDate()
  @Type(() => Number)
  createdAt: number;

  @ApiProperty({
    example: 1764220526750,
    description: 'last update timestamp',
  })
  @IsDate()
  @Type(() => Number)
  updatedAt: number;
}
