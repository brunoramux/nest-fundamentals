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
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import type { Connection } from 'src/common/constants/connection';
import type { Song } from './song.entity';
import type { DeleteResult, UpdateResult } from 'typeorm';
import type { UpdateSongDto } from './dto/update-song.dto';

@Controller('songs')
export class SongsController {
  constructor(
    private songsService: SongsService,
    @Inject('CONNECTION')
    private connection: Connection,
  ) {
    console.log('SongsController', connection);
  }

  @Post()
  create(@Body() createSongDTO: CreateSongDto): Promise<Song> {
    return this.songsService.create(createSongDTO);
  }

  @Get()
  findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ) {
    limit = limit > 100 ? 100 : limit;
    const options = {
      page,
      limit,
    };
    try {
      return this.songsService.paginate(options);
    } catch (error) {
      throw new HttpException(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    try {
      return this.songsService.findOne(id);
    } catch (error) {
      return new HttpException(
        'Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  @Delete(':id')
  remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.songsService.remove(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() updateSongDto: UpdateSongDto,
  ): Promise<UpdateResult> {
    return this.songsService.update(id, updateSongDto);
  }
}
