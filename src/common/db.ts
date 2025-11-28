import { Album } from '../album/types';
import { Artist } from '../artist/types';
import { Track } from '../track/types';
import { User } from '../user/types';

type EntityId = string;
export type FavCollectionName = keyof typeof db.favs;

export const db = {
  users: new Map<EntityId, User>(),
  artists: new Map<EntityId, Artist>(),
  tracks: new Map<EntityId, Track>(),
  albums: new Map<EntityId, Album>(),
  favs: {
    artists: new Set<EntityId>(),
    albums: new Set<EntityId>(),
    tracks: new Set<EntityId>(),
  },
};
