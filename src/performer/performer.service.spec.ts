/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { PerformerEntity } from './performer.entity';
import { PerformerService } from './performer.service';

import { faker } from '@faker-js/faker';

describe('PerformerService', () => {
  let service: PerformerService;
  let repository: Repository<PerformerEntity>;
  let performersList: PerformerEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [PerformerService],
    }).compile();

    service = module.get<PerformerService>(PerformerService);
    repository = module.get<Repository<PerformerEntity>>(getRepositoryToken(PerformerEntity));
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    performersList = [];
    for(let i = 0; i < 5; i++){
        const performer: PerformerEntity = await repository.save({
        nombre: faker.string.alphanumeric(10),
        imagen: faker.string.alphanumeric(10),
        descripcion: faker.string.alphanumeric(10),
        })
        performersList.push(performer);
    }
  }
    
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all performers', async () => {
    const performers: PerformerEntity[] = await service.findAll();
    expect(performers).not.toBeNull();
    expect(performers).toHaveLength(performersList.length);
  });

  it('findOne should return a performer by id', async () => {
    const storedPerformer: PerformerEntity = performersList[0];
    const performer: PerformerEntity = await service.findOne(storedPerformer.id);
    expect(performer).not.toBeNull();
    expect(performer.nombre).toEqual(storedPerformer.nombre)
    expect(performer.imagen).toEqual(storedPerformer.imagen)
    expect(performer.descripcion).toEqual(storedPerformer.descripcion)
  });

  it('findOne should throw an exception for an invalid performer', async () => {
    await expect(() => service.findOne("0")).rejects.toHaveProperty("message", "The performer with the given id was not found")
  });

  it('create should return a new performer', async () => {
    const performer: PerformerEntity = {
      id: "",
      nombre: faker.string.alphanumeric(10),
      imagen: faker.string.alphanumeric(10),
      descripcion: faker.string.alphanumeric(10),
      albums: []
    }

    const newPerformer: PerformerEntity = await service.create(performer);
    expect(newPerformer).not.toBeNull();

    const storedPerformer: PerformerEntity = await repository.findOne({where: {id: newPerformer.id}})
    expect(storedPerformer).not.toBeNull();
    expect(storedPerformer.nombre).toEqual(newPerformer.nombre)
    expect(storedPerformer.imagen).toEqual(newPerformer.imagen)
    expect(storedPerformer.descripcion).toEqual(newPerformer.descripcion)
  });

  it('create shoud throw an exception for an invalid descripcion', async () => {
    const performer: PerformerEntity = {
      id: "",
      nombre: faker.string.alphanumeric(10),
      imagen: faker.string.alphanumeric(10),
      descripcion: faker.string.alphanumeric(101),
      albums: []
    }
    await expect(() => service.create(performer)).rejects.toHaveProperty("message", "The length of the description cannot have more than 100 characters")

  });

  it('update should modify a performer', async () => {
    const performer: PerformerEntity = performersList[0];
    performer.nombre = "New name";
    performer.descripcion = "New descripcion";
  
    const updatedPerformer: PerformerEntity = await service.update(performer.id, performer);
    expect(updatedPerformer).not.toBeNull();
  
    const storedPerformer: PerformerEntity = await repository.findOne({ where: { id: performer.id } })
    expect(storedPerformer).not.toBeNull();
    expect(storedPerformer.nombre).toEqual(performer.nombre)
    expect(storedPerformer.descripcion).toEqual(performer.descripcion)
  });
 
  it('update should throw an exception for an invalid performer', async () => {
    let performer: PerformerEntity = performersList[0];
    performer = {
      ...performer, nombre: "New name", descripcion: "New descripcion"
    }
    await expect(() => service.update("0", performer)).rejects.toHaveProperty("message", "The performer with the given id was not found")
  });

  it('delete should remove a performer', async () => {
    const performer: PerformerEntity = performersList[0];
    await service.delete(performer.id);
  
    const deletedPerformer: PerformerEntity = await repository.findOne({ where: { id: performer.id } })
    expect(deletedPerformer).toBeNull();
  });

  it('delete should throw an exception for an invalid performer', async () => {
    const performer: PerformerEntity = performersList[0];
    await service.delete(performer.id);
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "The performer with the given id was not found")
  });
 
});