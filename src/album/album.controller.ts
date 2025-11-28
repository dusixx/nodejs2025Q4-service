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
import { UserResponseDto } from '../user/dto/user-response.dto';
import { AlbumService } from './album.service';
import { AlbumResponseDto } from './dto/album-response.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@ApiTags('album')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create new album' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'album successfully created',
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessage.InvalidRequestBody,
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ErrorMessage.AlreadyExists`album`,
  })
  public create(@Body() createAlbumDto: CreateAlbumDto): AlbumResponseDto {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all albums' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return all albums',
    type: [AlbumResponseDto],
  })
  public findAll(): AlbumResponseDto[] {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get album by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return album by ID',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'album not found',
  })
  public findOne(@Param('id') id: string): AlbumResponseDto {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update album' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'album successfully updated',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: ErrorMessage.InvalidOldPassword,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'album not found',
  })
  public update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto): AlbumResponseDto {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete album by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'album successfully deleted',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'album not found',
  })
  public remove(@Param('id') id: string): void {
    return this.albumService.remove(id);
  }
}
