/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AlbumEntity } from './album.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async findAll(): Promise<AlbumEntity[]> {
        return await this.albumRepository.find({ relations: ["performers","tracks"] });
    }
 
    async findOne(id: string): Promise<AlbumEntity> {
        const album: AlbumEntity = await this.albumRepository.findOne({where: {id}, relations: ["performers","tracks"] } );
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
   
        return album;
    }
   
    async create(album: AlbumEntity): Promise<AlbumEntity> {
        return await this.albumRepository.save(album);
    }
 
    async update(id: string, album: AlbumEntity): Promise<AlbumEntity> {
        const persistedAlbum: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (!persistedAlbum)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
       
        album.id = id; 
       
        return await this.albumRepository.save(album);
    }
 
    async delete(id: string) {
        const album: AlbumEntity = await this.albumRepository.findOne({where:{id}});
        if (!album)
          throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.albumRepository.remove(album);
    }
}