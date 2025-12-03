import { Injectable, NotFoundException } from '@nestjs/common';
import { ErrorMessage } from '../common/constants';
import { db } from '../common/db';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackResponseDto } from './dto/track-response.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  private tracks = db.tracks;

  public create({ name, albumId, artistId, duration }: CreateTrackDto): TrackResponseDto {
    const newItem: TrackResponseDto = {
      id: crypto.randomUUID(),
      name,
      albumId,
      artistId,
      duration,
    };
    this.tracks.set(newItem.id, newItem);
    return newItem;
  }

  public findAll(): TrackResponseDto[] {
    return [...this.tracks.values()];
  }

  public findOne(id: string): TrackResponseDto {
    return this.findById(id);
  }

  public update(id: string, updateDto: UpdateTrackDto): TrackResponseDto {
    const track = this.findById(id);
    const updated = { ...track, ...updateDto };
    this.tracks.set(id, updated);

    return updated;
  }

  public remove(id: string): void {
    const track = this.findById(id);

    db.favs.tracks.forEach((favId, _, col) => {
      if (favId === id) {
        col.delete(id);
      }
    });
    this.tracks.delete(track.id);
  }

  private findById(id: string): TrackResponseDto {
    const track = this.tracks.get(id);
    if (!track) {
      throw new NotFoundException(ErrorMessage.NotFound`track`);
    }
    return track;
  }
}
