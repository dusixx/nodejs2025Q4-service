import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { ErrorMessage } from '../common/constants';
import { ArtistResponseDto } from './dto/artist-response.dto';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './types';

@Injectable()
export class ArtistService {
  private artists = new Map<string /*id*/, Artist>();

  public create({ name, grammy }: CreateArtistDto): ArtistResponseDto {
    if (this.isArtistExists(name)) {
      throw new ConflictException(ErrorMessage.AlreadyExists`artist`);
    }
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

  public findOne(id: string): Artist {
    return this.findById(id);
  }

  public update(id: string, updateArtistDto: UpdateArtistDto): ArtistResponseDto {
    const artist = this.findById(id);
    const updated = { ...artist, ...updateArtistDto };
    this.artists.set(id, updated);

    return updated;
  }

  public remove(id: string): void {
    this.artists.delete(this.findById(id).id);
  }

  private isArtistExists(name: string): ArtistResponseDto {
    return [...this.artists.values()].find(artist => name === artist.name);
  }

  private findById(id: string): ArtistResponseDto {
    if (!validate(id)) {
      throw new BadRequestException(ErrorMessage.InvalidUUID);
    }
    const artist = this.artists.get(id);
    if (!artist) {
      throw new NotFoundException(ErrorMessage.NotFound`artist`);
    }
    return artist;
  }
}
