import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { Song } from './songs.entity';

export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
  ) {}
  async create(songTDO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songTDO.title;
    song.artists = songTDO.artists;
    song.duration = songTDO.duration;
    song.lyrics = songTDO.lyrics;
    song.releasedDate = songTDO.releasedDate;

    return await this.songRepository.save(song);
  }
}
