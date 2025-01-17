import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { GenericCrudService } from '../services/generic-crud.service';
import { FindManyOptions } from 'typeorm';

export function createGenericController<T>(path: string) {
  @Controller(path)
  class GenericController {
    constructor(readonly service: GenericCrudService<T>) {}

    @Post()
    create(@Body() data: any): Promise<T> {
      return this.service.create(data);
    }

    @Get('/:id')
    findOne(@Param('id') id: string): Promise<T | null> {
      return this.service.getById(id);
    }

    @Get()
    findAll(@Query() query?: FindManyOptions<T>): Promise<T[]> {
      if (query) {
        return this.service.getByQuery(query);
      }
      return this.service.getAll();
    }

    @Put('/:id')
    update(@Param('id') id: string, @Body() data: any): Promise<T | null> {
      return this.service.update(id, data);
    }

    @Delete('/:id')
    remove(@Param('id') id: string): Promise<boolean> {
      return this.service.delete(id);
    }
  }

  return GenericController;
}
