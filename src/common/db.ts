import { UserEntity } from 'src/user/entities/user.entity.js';
import { ArtistEntity } from 'src/artist/entities/artist.entity.js';
import { TrackEntity } from 'src/track/entities/track.entity.js';
import { AlbumEntity } from 'src/album/entities/album.entity.js';

type EntityId = string;
export type FavCollectionName = Exclude<keyof typeof db, 'users'>;

export const db = {
  users: new Map<EntityId, UserEntity>(),
  artists: new Map<EntityId, ArtistEntity>(),
  tracks: new Map<EntityId, TrackEntity>(),
  albums: new Map<EntityId, AlbumEntity>(),
};
