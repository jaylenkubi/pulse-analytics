import { Controller, Get, Post, Put, Delete, Body, Param, Query, Inject, Type, UseInterceptors } from '@nestjs/common';
import { GenericCrudService } from '../services/generic-crud.service';
import { FindManyOptions } from 'typeorm';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerRoute } from '../decorators/swagger.decorator';
import { HttpCacheInterceptor } from '../interceptors/http-cache.interceptor';
import { CacheInvalidationInterceptor } from '../interceptors/cache-invalidation.interceptor';
import { InvalidateCache } from '../decorators/invalidate-cache.decorator';
import { CacheTTL } from '@nestjs/cache-manager';

export function createGenericController<T>(path: string) {
  const entityName = path.charAt(0).toUpperCase() + path.slice(1);

  @ApiTags(entityName)
  @Controller(path)
  @UseInterceptors(HttpCacheInterceptor)
  class GenericController {
    constructor(
      @Inject(`${path.toUpperCase()}_SERVICE`)
      readonly service: GenericCrudService<T>
    ) {}

    @Post()
    @UseInterceptors(CacheInvalidationInterceptor)
    @InvalidateCache({ entity: path })
    @SwaggerRoute({
      summary: `Create ${entityName}`,
      operationId: `create${entityName}`,
      responseType: Object as unknown as Type<T>,
      status: 201,
      description: `The ${entityName} has been successfully created`
    })
    create(@Body() data: any): Promise<T> {
      return this.service.create(data);
    }

    @Get('/:id')
    @CacheTTL(300000) // Cache for 5 minutes
    @SwaggerRoute({
      summary: `Get ${entityName} by ID`,
      operationId: `get${entityName}ById`,
      responseType: Object as unknown as Type<T>,
      description: `Return the ${entityName} with the specified ID`
    })
    findOne(@Param('id') id: string): Promise<T | null> {
      return this.service.getById(id);
    }

    @Get()
    @CacheTTL(300000) // Cache for 5 minutes
    @SwaggerRoute({
      summary: `Get all ${entityName}s`,
      operationId: `getAll${entityName}s`,
      responseType: [Object as unknown as Type<T>] as unknown as Type<T[]>,
      description: `Return all ${entityName}s`
    })
    findAll(@Query() query?: FindManyOptions<T>): Promise<T[]> {
      if (query) {
        return this.service.getByQuery(query);
      }
      return this.service.getAll();
    }

    @Put('/:id')
    @UseInterceptors(CacheInvalidationInterceptor)
    @InvalidateCache({ entity: path })
    @SwaggerRoute({
      summary: `Update ${entityName}`,
      operationId: `update${entityName}`,
      responseType: Object as unknown as Type<T>,
      description: `Update the ${entityName} with the specified ID`
    })
    update(@Param('id') id: string, @Body() data: any): Promise<T | null> {
      return this.service.update(id, data);
    }

    @Delete('/:id')
    @UseInterceptors(CacheInvalidationInterceptor)
    @InvalidateCache({ entity: path })
    @SwaggerRoute({
      summary: `Delete ${entityName}`,
      operationId: `delete${entityName}`,
      responseType: Boolean,
      description: `Delete the ${entityName} with the specified ID`
    })
    remove(@Param('id') id: string): Promise<boolean> {
      return this.service.delete(id);
    }
  }

  return GenericController;
}
