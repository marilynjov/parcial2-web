/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { TrackEntity } from './track.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';
import { AlbumEntity } from '../album/album.entity';

@Injectable()
export class TrackService {
    constructor(
        @InjectRepository(TrackEntity)
        private readonly trackRepository: Repository<TrackEntity>,

        @InjectRepository(AlbumEntity)
        private readonly albumRepository: Repository<AlbumEntity>
    ){}

    async findAll(): Promise<TrackEntity[]> {
        return await this.trackRepository.find({ relations: ["album"] });
    }
 
    async findOne(id: string): Promise<TrackEntity> {
        const track: TrackEntity = await this.trackRepository.findOne({where: {id}, relations: ["album"] } );
        if (!track)
          throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
   
        return track;
    }
   
    async create(track: TrackEntity,albumId: string): Promise<TrackEntity> { 
        const album = await this.albumRepository.findOne({where: {id: albumId}, relations: ["performers"] });

        if(!album){
            throw new BusinessLogicException("The album with the given id was not found", BusinessError.NOT_FOUND);
        }
        if(track.duracion < 0){
            throw new BusinessLogicException("The length of the track is not greater than 0", BusinessError.NOT_FOUND);
        }
        return await this.trackRepository.save(track);
    }
 
    async update(id: string, track: TrackEntity): Promise<TrackEntity> {
        const persistedTrack: TrackEntity = await this.trackRepository.findOne({where:{id}});
        if (!persistedTrack)
          throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
       
        track.id = id; 
       
        return await this.trackRepository.save(track);
    }
 
    async delete(id: string) {
        const track: TrackEntity = await this.trackRepository.findOne({where:{id}});
        if (!track)
          throw new BusinessLogicException("The track with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.trackRepository.remove(track);
    }
}