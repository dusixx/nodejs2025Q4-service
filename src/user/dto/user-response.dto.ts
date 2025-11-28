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
import { UUID_VER } from '../../common/constants';
import { UserWithoutPassword } from '../types';

export class UserResponseDto implements UserWithoutPassword {
  @ApiProperty({
    description: 'uuid v4',
  })
  @IsUUID(UUID_VER)
  id: string;

  @ApiProperty({
    description: 'user login',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  login: string;

  @ApiProperty({
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
