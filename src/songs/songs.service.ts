import { Injectable } from '@nestjs/common';

@Injectable()
export class SongsService {
  private songs = [];

  create(song: string) {
    this.songs.push(song);
  }

  findAll() {
    return this.songs;
  }
}
