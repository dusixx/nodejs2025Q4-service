import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { validate } from 'uuid';
import { ErrorMessage } from '../common/constants';
import { db } from '../common/db';
import { AlbumResponseDto } from './dto/album-response.dto';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumService {
  private albums = db.albums;

  public create({ name, artistId, year }: CreateAlbumDto): AlbumResponseDto {
    const newItem: AlbumResponseDto = {
      id: crypto.randomUUID(),
      name,
      artistId,
      year,
    };
    this.albums.set(newItem.id, newItem);
    return newItem;
  }

  public findAll(): AlbumResponseDto[] {
    return [...this.albums.values()];
  }

  public findOne(id: string): AlbumResponseDto {
    return this.findById(id);
  }

  public update(id: string, updateDto: UpdateAlbumDto): AlbumResponseDto {
    const album = this.findById(id);
    const updated = { ...album, ...updateDto };
    this.albums.set(id, updated);

    return updated;
  }

  public remove(id: string): void {
    const album = this.findById(id);

    db.tracks.forEach(track => {
      if (track.albumId === id) {
        track.albumId = null;
      }
    });
    db.favs.albums.forEach((favId, _, col) => {
      if (favId === id) {
        col.delete(id);
      }
    });
    this.albums.delete(album.id);
  }

  private findById(id: string): AlbumResponseDto {
    if (!validate(id)) {
      throw new BadRequestException(ErrorMessage.InvalidUUID);
    }
    const album = this.albums.get(id);
    if (!album) {
      throw new NotFoundException(ErrorMessage.NotFound`album`);
    }
    return album;
  }
}
