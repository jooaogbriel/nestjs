import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Scope,
} from '@nestjs/common';
import { Connection } from 'src/common/middleware/logger/constants/connection';
import { CreateSongDTO } from './dto/create-song-dto';
import { SongsService } from './songs.service';

@Controller({
  path: 'songs',
  scope: Scope.REQUEST,
})
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log(`${this.connection.CONNECTION_STRING}`);
  }
  @Post()
  create(@Body() createSongDTO: CreateSongDTO) {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll() {
    try {
      const songs = this.songsService.findAll();
      return songs;
    } catch (error) {
      throw (
        (new HttpException('server error', HttpStatus.INTERNAL_SERVER_ERROR),
        { cause: error })
      );
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return `return the id${id}`;
  }

  @Put(':id')
  updateOne() {
    return 'update Song';
  }

  @Delete(':id')
  deleteSong() {
    return 'Delete';
  }
}
