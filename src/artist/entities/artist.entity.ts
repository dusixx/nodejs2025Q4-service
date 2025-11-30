import { Artist } from '../types';

export class ArtistEntity implements Artist {
  id: string;
  name: string;
  grammy: boolean;
}
