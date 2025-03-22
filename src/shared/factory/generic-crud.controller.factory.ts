import { Controller, Get, Post, Put, Delete, Body, Param, Query, Inject, Type, UseInterceptors } from '@nestjs/common';
import { GenericCrudService } from '../services/generic-crud.service';
import { FindManyOptions } from 'typeorm';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { SwaggerRoute } from '../decorators/swagger.decorator';
import { HttpCacheInterceptor } from '../interceptors/http-cache.interceptor';
import { CacheInvalidationInterceptor } from '../interceptors/cache-invalidation.interceptor';
import { InvalidateCache } from '../decorators/invalidate-cache.decorator';
import { CacheTTL } from '@nestjs/cache-manager';
import { CreateWebsiteDto } from '../dto/website/create-website.dto';
import { UpdateWebsiteDto } from '../dto/website/update-website.dto';
import { CreateWebsiteAccessDto } from '../dto/website-access/create-website-access.dto';
import { UpdateWebsiteAccessDto } from '../dto/website-access/update-website-access.dto';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { CreateSessionDto } from '../dto/session/create-session.dto';
import { UpdateSessionDto } from '../dto/session/update-session.dto';
import { CreateAuditLogDto } from '../dto/audit-log/create-audit-log.dto';
import { CreateEventDto } from '../dto/event/create-event.dto';
import { WebsiteResponseDto } from '../dto/website/website-response.dto';
import { WebsiteAccessResponseDto } from '../dto/website-access/website-access-response.dto';
import { UserResponseDto } from '../dto/user/user-response.dto';
import { SessionResponseDto } from '../dto/session/session-response.dto';
import { AuditLogResponseDto } from '../dto/audit-log/audit-log-response.dto';
import { EventResponseDto } from '../dto/event/event-response.dto';

export function createGenericController<T>(path: string) {
  const entityName = path.charAt(0).toUpperCase() + path.slice(1);
  const ResponseDto = getResponseDto(path);

  class ResponseDtoArray extends Array<InstanceType<typeof ResponseDto>> {
    constructor() {
      super();
      Object.setPrototypeOf(this, ResponseDtoArray.prototype);
    }
  }

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
      responseType: ResponseDto,
      bodyType: getCreateDto(path),
      status: 201,
      description: `The ${entityName} has been successfully created`
    })
    create(@Body() data: any): Promise<T> {
      return this.service.create(data);
    }

    @Get('/:id')
    @CacheTTL(300000)
    @SwaggerRoute({
      summary: `Get ${entityName} by ID`,
      operationId: `get${entityName}ById`,
      responseType: ResponseDto,
      description: `Return the ${entityName} with the specified ID`
    })
    findOne(@Param('id') id: string): Promise<T | null> {
      return this.service.getById(id);
    }

    @Get('all')
    @CacheTTL(300000)
    @SwaggerRoute({
      summary: `Get all ${entityName}s`,
      operationId: `getAll${entityName}s`,
      responseType: ResponseDtoArray,
      description: `Return all ${entityName}s`
    })
    findAll(@Query() query?: FindManyOptions<T>): Promise<T[]> {
      if (query) {
        return this.service.getByQuery(query);
      }
      return this.service.getAll();
    }
    
    @Get('query')
    @CacheTTL(300000)
    @SwaggerRoute({
      summary: `Get by query ${entityName}s`,
      operationId: `getByQuery${entityName}s`,
      responseType: ResponseDtoArray,
      description: `Return ${entityName}s by query`
    })
    getByQuery(@Query() query?: FindManyOptions<T>): Promise<T[]> {
      return this.service.getByQuery(query);
    }

    @Put('update/:id')
    @UseInterceptors(CacheInvalidationInterceptor)
    @InvalidateCache({ entity: path })
    @SwaggerRoute({
      summary: `Update ${entityName}`,
      operationId: `update${entityName}`,
      responseType: ResponseDto,
      bodyType: getUpdateDto(path),
      description: `Update the ${entityName} with the specified ID`
    })
    update(@Param('id') id: string, @Body() data: any): Promise<T | null> {
      return this.service.update(id, data);
    }

    @Delete('delete/:id')
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

function getCreateDto(path: string): Type<any> {
  const dtoMap: Record<string, Type<any>> = {
    'websites': CreateWebsiteDto,
    'website-access': CreateWebsiteAccessDto,
    'users': CreateUserDto,
    'sessions': CreateSessionDto,
    'audit-logs': CreateAuditLogDto,
    'events': CreateEventDto,
  };
  return dtoMap[path] || Object;
}

function getUpdateDto(path: string): Type<any> {
  const dtoMap: Record<string, Type<any>> = {
    'websites': UpdateWebsiteDto,
    'website-access': UpdateWebsiteAccessDto,
    'users': UpdateUserDto,
    'sessions': UpdateSessionDto,
  };
  return dtoMap[path] || Object;
}

function getResponseDto(path: string): Type<any> {
  const dtoMap: Record<string, Type<any>> = {
    'websites': WebsiteResponseDto,
    'website-access': WebsiteAccessResponseDto,
    'users': UserResponseDto,
    'sessions': SessionResponseDto,
    'audit-logs': AuditLogResponseDto,
    'events': EventResponseDto,
  };
  return dtoMap[path] || Object;
}
