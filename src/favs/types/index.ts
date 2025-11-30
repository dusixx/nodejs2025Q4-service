import { Album } from '../../album/types';
import { Artist } from '../../artist/types';
import { Track } from '../../track/types';

export type FavsResponse = {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
};
