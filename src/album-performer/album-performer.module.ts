/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AlbumPerformerService } from './album-performer.service';
import { AlbumEntity } from 'src/album/album.entity';
import { PerformerEntity } from 'src/performer/performer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlbumPerformerController } from './album-performer.controller';

@Module({
  imports:[TypeOrmModule.forFeature([AlbumEntity,PerformerEntity])],
  providers: [AlbumPerformerService],
  controllers: [AlbumPerformerController]

})
export class AlbumPerformerModule {}
