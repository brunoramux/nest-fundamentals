import { Controller, Get, Post, Query } from '@nestjs/common';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService) {}

  @Post()
  create(@Query('song') song: string) {
    this.songsService.create(song);
  }

  @Get()
  findAll() {
    return this.songsService.findAll();
  }
}
