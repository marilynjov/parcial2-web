/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrackEntity } from './track.entity';
import { AlbumEntity } from '../album/album.entity';
import { TrackController } from './track.controller';

@Module({
  providers: [TrackService],
  imports: [TypeOrmModule.forFeature([TrackEntity,AlbumEntity])],
  controllers: [TrackController],
})
export class TrackModule {}
