/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { AlbumPerformerService } from './album-performer.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PerformerDto } from 'src/performer/performer.dto/performer.dto';
import { plainToInstance } from 'class-transformer';
import { PerformerEntity } from 'src/performer/performer.entity';

@Controller('albums')
@UseInterceptors(BusinessErrorsInterceptor)
export class AlbumPerformerController {
   constructor(private readonly albumPerformerService: AlbumPerformerService){}

   @Post(':albumId/performers/:artworkId')
   async addPerformerAlbum(@Param('albumId') albumId: string, @Param('artworkId') artworkId: string){
       return await this.albumPerformerService.addPerformerAlbum(albumId, artworkId);
   }

   @Get(':albumId/performers/:artworkId')
   async findPerformerByAlbumIdPerformerId(@Param('albumId') albumId: string, @Param('artworkId') artworkId: string){
       return await this.albumPerformerService.findPerformerByAlbumIdPerformerId(albumId, artworkId);
   }

   @Get(':albumId/performers')
   async findPerformersByAlbumId(@Param('albumId') albumId: string){
       return await this.albumPerformerService.findPerformersByAlbumId(albumId);
   }
   @Put(':albumId/performers')
   async associatePerformersAlbum(@Body() performersDto: PerformerDto[], @Param('albumId') albumId: string){
       const performers = plainToInstance(PerformerEntity, performersDto)
       return await this.albumPerformerService.associatePerformersAlbum(albumId, performers);
   }

   @Delete(':albumId/performers/:artworkId')
    @HttpCode(204)
   async deletePerformerAlbum(@Param('albumId') albumId: string, @Param('artworkId') artworkId: string){
       return await this.albumPerformerService.deletePerformerAlbum(albumId, artworkId);
   }
}