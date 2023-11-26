/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { PerformerService } from './performer.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { PerformerEntity } from './performer.entity';
import { PerformerDto } from './performer.dto/performer.dto';
import { plainToInstance } from 'class-transformer';

@Controller('performers')
@UseInterceptors(BusinessErrorsInterceptor)
export class PerformerController {
  constructor(private readonly performerService: PerformerService) {}

  @Get()
    async findAll() {
        return await this.performerService.findAll();
    }

    @Get(':performerId')
    async findOne(@Param('performerId') performerId: string) {
        return await this.performerService.findOne(performerId);
    }

    @Post()
    async create(@Body() performerDto: PerformerDto) {
        const performer: PerformerEntity = plainToInstance(PerformerEntity, performerDto);
        return await this.performerService.create(performer);
    }

    @Put(':performerId')
    async update(@Param('performerId') performerId: string, @Body() performerDto: PerformerDto) {
        const performer: PerformerEntity = plainToInstance(PerformerEntity, performerDto);
        return await this.performerService.update(performerId, performer);
    }

    @Delete(':performerId')
    @HttpCode(204)
    async delete(@Param('performerId') performerId: string) {
        return await this.performerService.delete(performerId);
    }

}