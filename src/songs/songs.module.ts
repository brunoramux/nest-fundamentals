import { Module } from '@nestjs/common';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { connection } from 'src/common/constants/connection';

@Module({
  imports: [],
  controllers: [SongsController],
  providers: [
    {
      provide: SongsService,
      useClass: SongsService,
      // useValue => Para inserir um função mock
    },
    {
      provide: 'CONNECTION',
      useValue: connection,
    },
  ],
})
export class SongsModule {}
