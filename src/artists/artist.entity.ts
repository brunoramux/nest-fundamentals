import { IsString } from 'class-validator';
import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @IsString()
  name: string;

  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
