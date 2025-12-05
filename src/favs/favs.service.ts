import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { db, type FavCollectionName } from '../common/db';
import { FavsResponseDto } from './dto/favs-response.dto';
import { omit } from '../common/utils';

@Injectable()
export class FavsService {
  public create(id: string, colName: FavCollectionName): void {
    if (!db[colName].has(id)) {
      throw new UnprocessableEntityException();
    }
    const entity = db[colName].get(id);
    entity.isFavorite = true;
  }

  public findAll(): FavsResponseDto {
    return {
      artists: [...db.artists.values()].filter(a => a.isFavorite).map(a => omit(a, 'isFavorite')),
      albums: [...db.albums.values()].filter(a => a.isFavorite).map(a => omit(a, 'isFavorite')),
      tracks: [...db.tracks.values()].filter(t => t.isFavorite).map(t => omit(t, 'isFavorite')),
    };
  }

  public remove(id: string, colName: FavCollectionName): void {
    const fav = db[colName].get(id);
    if (!fav) {
      throw new NotFoundException();
    }
    fav.isFavorite = false;
  }
}
