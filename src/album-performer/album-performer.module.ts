/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AlbumPerformerService } from './album-performer.service';
import { AlbumEntity } from 'src/album/album.entity';
import { PerformerEntity } from 'src/performer/performer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([AlbumEntity,PerformerEntity])],
  providers: [AlbumPerformerService]

})
export class AlbumPerformerModule {}
