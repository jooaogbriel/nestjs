import { Artist } from 'src/artists/artists.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('songs')
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('date')
  releasedDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  @ManyToMany(() => Artist, (artists) => artists.songs, { cascade: true })
  @JoinTable({ name: 'songs_artists' })
  artists: Artist[];
}
