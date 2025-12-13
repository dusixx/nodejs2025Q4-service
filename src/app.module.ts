import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { AuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './common/services/prisma.module.js';
import { FavsModule } from './favs/favs.module';
import { LoggingMiddleware } from './logging/logging.middleware';
import { LoggingModule } from './logging/logging.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggingModule,
    AuthModule,
    UserModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavsModule,
    PrismaModule,
  ],
})
export class AppModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
