import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { FavCollectionName } from '../common/db';
import { FavsResponseDto } from './dto/favs-response.dto';
import { FavsService } from './favs.service';

@ApiTags('favs')
@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Post(['track/:id', 'album/:id', 'artist/:id'])
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'add to favs' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'successfully added',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    description: `nothing to add to favs`,
  })
  public create(@Param('id') id: string, @Req() req: Request): Record<string, unknown> {
    const [, path] = req.path.match(/.+\/([^/]+)\//);
    this.favsService.create(id, `${path}s` as FavCollectionName);

    return { message: 'successfully added' };
  }

  @Get()
  @ApiOperation({ summary: 'get all favs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return all favs',
    type: FavsResponseDto,
  })
  public findAll(): FavsResponseDto {
    return this.favsService.findAll();
  }

  @Delete(['track/:id', 'album/:id', 'artist/:id'])
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'delete from favs' })
  @ApiParam({
    name: 'id',
    type: 'string',
    format: 'uuid',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'successfully deleted',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'id is not UUID',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'is not favorite',
  })
  public remove(@Param('id') id: string, @Req() req: Request): Record<string, unknown> {
    const [, path] = req.path.match(/.+\/([^/]+)\//);
    this.favsService.remove(id, `${path}s` as FavCollectionName);

    return { message: 'successfully deleted' };
  }
}
