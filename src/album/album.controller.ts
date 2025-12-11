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
import { validateUUID } from '../common/utils';
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
  })
  public async create(@Body() createAlbumDto: CreateAlbumDto): Promise<AlbumResponseDto> {
    return await this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all albums' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return all albums',
    type: [AlbumResponseDto],
  })
  public async findAll(): Promise<AlbumResponseDto[]> {
    return await this.albumService.findAll();
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
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'album not found',
  })
  public async findOne(@Param('id', validateUUID()) id: string): Promise<AlbumResponseDto> {
    return await this.albumService.findOne(id);
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
    type: AlbumResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'album not found',
  })
  public async update(
    @Param('id', validateUUID()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ): Promise<AlbumResponseDto> {
    return await this.albumService.update(id, updateAlbumDto);
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
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'album not found',
  })
  public async remove(@Param('id', validateUUID()) id: string): Promise<void> {
    return await this.albumService.remove(id);
  }
}
