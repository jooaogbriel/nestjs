import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artists.entity';
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDTO } from './dto/create-song-dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './songs.entity';

export class SongsService {
  constructor(
    @InjectRepository(Song) private songRepository: Repository<Song>,
    @InjectRepository(Artist) private artistsRepository: Repository<Artist>,
  ) {}
  async create(songTDO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songTDO.title;
    song.artists = songTDO.artists;
    song.duration = songTDO.duration;
    song.lyrics = songTDO.lyrics;
    song.releasedDate = songTDO.releasedDate;

    const artists = await this.artistsRepository.findByIds(songTDO.artists);
    song.artists = artists;
    return await this.songRepository.save(song);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    return paginate<Song>(this.songRepository, options);
  }

  async listSongs() {
    return await this.songRepository.find();
  }

  async listSong(id: number): Promise<Song> {
    return await this.songRepository.findOneBy({ id });
  }

  async deleteSong(id: number) {
    return await this.songRepository.delete({ id });
  }

  async updateSong(
    id: number,
    updateSongDTO: UpdateSongDto,
  ): Promise<UpdateResult> {
    return await this.songRepository.update(id, updateSongDTO);
  }
}
