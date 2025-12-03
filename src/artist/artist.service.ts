import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessage } from '../common/constants';
import { db } from '../common/db';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  private artists = db.artists;

  public create({ name, grammy }: CreateArtistDto): ArtistResponseDto {
    const newArtist: ArtistResponseDto = {
      id: crypto.randomUUID(),
      name,
      grammy,
    };
    this.artists.set(newArtist.id, newArtist);
    return newArtist;
  }

  public findAll(): ArtistResponseDto[] {
    return [...this.artists.values()];
  }

  public findOne(id: string): ArtistResponseDto {
    return this.findById(id);
  }

  public update(id: string, updateArtistDto: UpdateArtistDto): ArtistResponseDto {
    const artist = this.findById(id);
    const updated = { ...artist, ...updateArtistDto };
    this.artists.set(id, updated);

    return updated;
  }

  public remove(id: string): void {
    const artist = this.findById(id);

    db.tracks.forEach(track => {
      if (track.artistId === id) {
        track.artistId = null;
      }
    });
    db.albums.forEach(album => {
      if (album.artistId === id) {
        album.artistId = null;
      }
    });
    db.favs.artists.forEach((favId, _, col) => {
      if (favId === id) {
        col.delete(id);
      }
    });
    this.artists.delete(artist.id);
  }

  private findById(id: string): ArtistResponseDto {
    const artist = this.artists.get(id);
    if (!artist) {
      throw new NotFoundException(ErrorMessage.NotFound`artist`);
    }
    return artist;
  }
}
