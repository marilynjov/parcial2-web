/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { TrackService } from './track.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { TrackEntity } from './track.entity';
import { TrackDto } from './track.dto/track.dto';
import { plainToInstance } from 'class-transformer';
import { AlbumEntity } from 'src/album/album.entity';

@Controller('tracks')
@UseInterceptors(BusinessErrorsInterceptor)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
    async findAll() {
        return await this.trackService.findAll();
    }

    @Get(':trackId')
    async findOne(@Param('trackId') trackId: string) {
        return await this.trackService.findOne(trackId);
    }

    @Post()
    async create(@Body() trackDto: TrackDto) {
        const track: TrackEntity = plainToInstance(TrackEntity, trackDto);
        const album: AlbumEntity = plainToInstance(AlbumEntity, trackDto.album);

        return await this.trackService.create(track,album.id);
    }

    @Put(':trackId')
    async update(@Param('trackId') trackId: string, @Body() trackDto: TrackDto) {
        const track: TrackEntity = plainToInstance(TrackEntity, trackDto);
        return await this.trackService.update(trackId, track);
    }

    @Delete(':trackId')
    @HttpCode(204)
    async delete(@Param('trackId') trackId: string) {
        return await this.trackService.delete(trackId);
    }

}