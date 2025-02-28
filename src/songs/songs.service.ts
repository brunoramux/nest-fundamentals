import { Injectable } from '@nestjs/common';
import type { CreateSongDto } from './dto/create-song-dto';

@Injectable()
export class SongsService {
  private songs: CreateSongDto[] = [];

  create(song: CreateSongDto) {
    this.songs.push(song);
  }

  findAll() {
    return this.songs;
  }

  findOne(id: number) {
    const song = this.songs.find((song) => song.id === id);

    if (!song) {
      return 'Song not found';
    }

    return song;
  }
}
