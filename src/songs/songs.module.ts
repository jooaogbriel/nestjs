import { Module } from '@nestjs/common';
import { connection } from 'src/common/middleware/logger/constants/connection';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';

// const mockSongsService = {
//   findAll() {
//     return [{ id: 1, title: 'mockinbird', artists: ['eminem'] }];
//   },
// };

@Module({
  controllers: [SongsController],
  providers: [
    SongsService,
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
