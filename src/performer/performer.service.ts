/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PerformerEntity } from './performer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class PerformerService {
    constructor(
        @InjectRepository(PerformerEntity)
        private readonly performerRepository: Repository<PerformerEntity>
    ){}

    async findAll(): Promise<PerformerEntity[]> {
        return await this.performerRepository.find({ relations: ["albums"] });
    }
 
    async findOne(id: string): Promise<PerformerEntity> {
        const performer: PerformerEntity = await this.performerRepository.findOne({where: {id}, relations: ["albums"] } );
        if (!performer)
          throw new BusinessLogicException("The performer with the given id was not found", BusinessError.NOT_FOUND);
   
        return performer;
    }
   
    async create(performer: PerformerEntity): Promise<PerformerEntity> {
        return await this.performerRepository.save(performer);
    }
 
    async update(id: string, performer: PerformerEntity): Promise<PerformerEntity> {
        const persistedPerformer: PerformerEntity = await this.performerRepository.findOne({where:{id}});
        if (!persistedPerformer)
          throw new BusinessLogicException("The performer with the given id was not found", BusinessError.NOT_FOUND);
       
        performer.id = id; 
       
        return await this.performerRepository.save(performer);
    }
 
    async delete(id: string) {
        const performer: PerformerEntity = await this.performerRepository.findOne({where:{id}});
        if (!performer)
          throw new BusinessLogicException("The performer with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.performerRepository.remove(performer);
    }
}