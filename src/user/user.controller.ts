import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorMessage } from '../common/constants';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create new user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'user successfully created',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessage.InvalidRequestBody,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'user with this name already exists',
  })
  public create(@Body() createUserDto: CreateUserDto): UserResponseDto {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return all users',
    type: [UserResponseDto],
  })
  public findAll(): UserResponseDto[] {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get user by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return user by ID',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user not found',
  })
  public findOne(@Param('id') id: string): UserResponseDto {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update user password' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'user successfully updated',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'old password is invalid',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user not found',
  })
  public update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): UserResponseDto {
    return this.userService.updatePassword(id, updatePasswordDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete user by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'user successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'user not found',
  })
  public remove(@Param('id') id: string): void {
    this.userService.remove(id);
  }
}
