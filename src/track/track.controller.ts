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
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackResponseDto } from './dto/track-response.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackService } from './track.service';

@ApiTags('track')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create new track' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'track successfully created',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: ErrorMessage.InvalidRequestBody,
  })
  create(@Body() createTrackDto: CreateTrackDto): TrackResponseDto {
    return this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all tracks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return all tracks',
    type: [TrackResponseDto],
  })
  findAll(): TrackResponseDto[] {
    return this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get track by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return track by ID',
    type: TrackResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track not found',
  })
  findOne(@Param('id') id: string): TrackResponseDto {
    return this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update track' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'track successfully updated',
    type: TrackResponseDto,
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
    description: 'track not found',
  })
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto): TrackResponseDto {
    return this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete track by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'track successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'track not found',
  })
  remove(@Param('id') id: string): void {
    this.trackService.remove(id);
  }
}
