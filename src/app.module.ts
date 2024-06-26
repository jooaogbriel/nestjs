import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Artist } from './artists/artists.entity';
import { LoggerMiddleware } from './common/middleware/logger/logger.middleware';
// import { Playlist } from './playlists/playlist.entity';
// import { PlayListModule } from './playlists/playlists.module';
import { SongsController } from './songs/songs.controller';
import { Song } from './songs/songs.entity';
import { SongsModule } from './songs/songs.module';
import { User } from './users/user.entity';
// import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'udemy-course',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'jooaogbriel17',
      entities: [Song, User, Artist],
      synchronize: true,
    }),
    SongsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(/*private dataSource: DataSource*/) {
    // console.log('dbName ', dataSource.driver.database);
  }
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2

    consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
  }
}
