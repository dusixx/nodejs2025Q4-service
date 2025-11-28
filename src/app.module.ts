/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { FavsModule } from './favs/favs.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
  ],
})
export class AppModule {}
