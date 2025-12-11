import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { isPrismaNotFoundError, omit } from '../common/utils';
import { FavsResponseDto } from './dto/favs-response.dto';
import { FavCollectionName } from './types';

@Injectable()
export class FavsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(id: string, colName: FavCollectionName): Promise<void> {
    await this.update(id, colName, true);
  }

  public async findAll(): Promise<FavsResponseDto> {
    const artists = await this.prisma.artist.findMany({ where: { isFavorite: true } });
    const albums = await this.prisma.album.findMany({ where: { isFavorite: true } });
    const tracks = await this.prisma.track.findMany({ where: { isFavorite: true } });
    return {
      artists: artists.map(v => omit(v, 'isFavorite')),
      albums: albums.map(v => omit(v, 'isFavorite')),
      tracks: tracks.map(v => omit(v, 'isFavorite')),
    };
  }

  public async remove(id: string, colName: FavCollectionName): Promise<Promise<Promise<void>>> {
    await this.update(id, colName, false);
  }

  private async update(
    id: string,
    colName: FavCollectionName,
    create: boolean,
  ): Promise<Promise<Promise<void>>> {
    try {
      switch (colName) {
        case 'album': {
          await this.prisma.album.update({
            where: { id },
            data: { isFavorite: create },
          });
          break;
        }
        case 'artist': {
          await this.prisma.artist.update({
            where: { id },
            data: { isFavorite: create },
          });
          break;
        }
        case 'track': {
          await this.prisma.track.update({
            where: { id },
            data: { isFavorite: create },
          });
        }
      }
    } catch (err) {
      if (isPrismaNotFoundError(err)) {
        if (create) {
          throw new UnprocessableEntityException();
        } else {
          throw new NotFoundException();
        }
      }
      throw err;
    }
  }
}
