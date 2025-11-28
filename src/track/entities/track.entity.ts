import { Track } from '../types';

export class TrackEntity implements Track {
  id: string;
  name: string;
  artistId: string;
  albumId: string;
  duration: number;
}
