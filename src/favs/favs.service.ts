import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { db, type FavCollectionName } from '../common/db';
import { FavsResponseDto } from './dto/favs-response.dto';

@Injectable()
export class FavsService {
  private favs = db.favs;

  public create(id: string, colName: FavCollectionName): void {
    if (!db[colName].has(id)) {
      throw new UnprocessableEntityException();
    }
    this.favs[colName].add(id);
  }

  public findAll(): FavsResponseDto {
    return {
      artists: [...this.favs.artists].map(id => db.artists.get(id)),
      albums: [...this.favs.albums].map(id => db.albums.get(id)),
      tracks: [...this.favs.tracks].map(id => db.tracks.get(id)),
    };
  }

  public remove(id: string, colName: FavCollectionName): void {
    const success = this.favs[colName].delete(id);
    if (!success) {
      throw new NotFoundException();
    }
  }
}
