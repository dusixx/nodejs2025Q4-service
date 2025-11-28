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
import { UserResponseDto } from '../user/dto/user-response.dto';
import { ArtistService } from './artist.service';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@ApiTags('artist')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create new artist' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'artist successfully created',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'request body does not contain required fields',
    type: ArtistResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'artist with this login already exists',
  })
  public create(@Body() createArtistDto: CreateArtistDto): ArtistResponseDto {
    return this.artistService.create(createArtistDto);
  }

  @ApiOperation({ summary: 'get all artists' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return all artists',
    type: [ArtistResponseDto],
  })
  @Get()
  public findAll(): ArtistResponseDto[] {
    return this.artistService.findAll();
  }

  @ApiOperation({ summary: 'get artist by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return artist by ID',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'artist not found',
  })
  @Get(':id')
  public findOne(@Param('id') id: string): ArtistResponseDto {
    return this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'update artist' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'artist successfully updated',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'artist not found',
  })
  public update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ): ArtistResponseDto {
    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete artist by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'artist successfully deleted',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'artist not found',
  })
  public remove(@Param('id') id: string): void {
    return this.artistService.remove(id);
  }
}
