import { Repository } from 'typeorm';
import { GenericCrudService } from '@shared/services/generic-crud.service';
import { TypeOrmAdapter } from '@shared/adapters/typeorm.adapter';

export function createGenericService<T>(repository: Repository<T>): GenericCrudService<T> {
  const adapter = new TypeOrmAdapter(repository);
  return new GenericCrudService(adapter);
}