import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessage } from '../common/constants';
import { PrismaService } from '../common/services/prisma.service';
import { isPrismaNotFoundError } from '../common/utils';
import { AlbumResponseDto } from './dto/album-response.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createDto: CreateAlbumDto): Promise<AlbumResponseDto> {
    return await this.prisma.album.create({ data: createDto });
  }

  public async findAll(): Promise<AlbumResponseDto[]> {
    return await this.prisma.album.findMany();
  }

  public async findOne(id: string): Promise<AlbumResponseDto> {
    return await this.findById(id);
  }

  public async update(id: string, updateDto: UpdateAlbumDto): Promise<AlbumResponseDto> {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: updateDto,
      });
    } catch (err) {
      if (isPrismaNotFoundError(err)) {
        throw new NotFoundException(ErrorMessage.NotFound`album`);
      }
      throw err;
    }
  }

  public async remove(id: string): Promise<void> {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch (err) {
      if (isPrismaNotFoundError(err)) {
        throw new NotFoundException(ErrorMessage.NotFound`album`);
      }
      throw err;
    }
  }

  private async findById(id: string): Promise<AlbumResponseDto> {
    const album = await this.prisma.album.findUnique({ where: { id } });
    if (!album) {
      throw new NotFoundException(ErrorMessage.NotFound`album`);
    }
    return album;
  }
}
