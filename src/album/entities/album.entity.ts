import { Album } from '../types';

export class AlbumEntity implements Album {
  id: string;
  name: string;
  year: number;
  artistId: string;
}
