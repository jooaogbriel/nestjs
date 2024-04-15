import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artists/artists.entity';
import { SongsController } from './songs.controller';
import { Song } from './songs.entity';
import { SongsService } from './songs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Song, Artist])],
  controllers: [SongsController],
  providers: [SongsService],
})
export class SongsModule {}
