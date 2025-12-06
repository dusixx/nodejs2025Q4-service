import { Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { validateUUID } from '../common/utils';
import { FavsResponseDto } from './dto/favs-response.dto';
import { FavsService } from './favs.service';
import { FavCollectionName } from './types';

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
  public async create(
    @Param('id', validateUUID()) id: string,
    @Req() req: Request,
  ): Promise<Record<string, unknown>> {
    const [, path] = req.path.match(/.+\/([^/]+)\//);
    await this.favsService.create(id, path as FavCollectionName);

    return { message: 'successfully added' };
  }

  @Get()
  @ApiOperation({ summary: 'get all favs' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'return all favs',
    type: FavsResponseDto,
  })
  public async findAll(): Promise<FavsResponseDto> {
    return await this.favsService.findAll();
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
  public async remove(
    @Param('id', validateUUID()) id: string,
    @Req() req: Request,
  ): Promise<Record<string, unknown>> {
    const [, path] = req.path.match(/.+\/([^/]+)\//);
    await this.favsService.remove(id, path as FavCollectionName);

    return { message: 'successfully deleted' };
  }
}
