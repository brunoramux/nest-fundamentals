import { Injectable } from '@nestjs/common';
import type { CreateSongDto } from './dto/create-song.dto';
import { DeleteResult, In, Repository, type UpdateResult } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import type { UpdateSongDto } from './dto/update-song.dto';
import {
  paginate,
  type IPaginationOptions,
  type Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async create(songDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = songDto.title;
    song.releaseDate = songDto.releaseDate;
    song.duration = songDto.duration;
    song.lyrics = songDto.lyrics;

    const artists = await this.artistsRepository.findBy({
      id: In([...songDto.artists]),
    });

    song.artists = artists;

    const response = await this.songsRepository.save(song);
    return response;
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    return await paginate<Song>(
      this.songsRepository
        .createQueryBuilder('song')
        .orderBy('song.releaseDate', 'DESC'),
      options,
    );
  }

  async findOne(id: number): Promise<Song> {
    const result = await this.songsRepository.findOneBy({ id });

    if (!result) {
      throw new Error('Song not found');
    }

    return result;
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.songsRepository.delete(id);
  }

  async update(id: number, songDto: UpdateSongDto): Promise<UpdateResult> {
    return this.songsRepository.update(id, songDto);
  }
}
