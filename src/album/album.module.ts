/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
