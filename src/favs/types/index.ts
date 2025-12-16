import { Album } from '../../album/types';
import { Artist } from '../../artist/types';
import { Prisma } from '../../common/prisma/generated/client/client';
import { Track } from '../../track/types';

export type FavCollectionName = Exclude<Lowercase<Prisma.ModelName>, 'user'>;

export type FavsResponse = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};
