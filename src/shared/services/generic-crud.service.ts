import { DeepPartial, FindManyOptions } from 'typeorm';
import { TypeOrmAdapter } from '../adapters/typeorm.adapter';

export class GenericCrudService<T> {
  constructor(protected readonly adapter: TypeOrmAdapter<T>) {}

  /**
   * Create a new entity
   * @param data The data to create the entity with
   */
  async create(data: any): Promise<T> {
    return this.adapter.create(data);
  }

  /**
   * Find an entity by its ID
   * @param id The ID of the entity
   */
  async getById(id: string | number): Promise<T | null> {
    return this.adapter.findById(id);
  }

  /**
   * Find all entities matching the conditions
   */
  async getAll(): Promise<T[]> {
    return this.adapter.findAll();
  }


  /**
   * Find all entities matching the conditions
   * @param query The conditions to search entities by
   */
  async getByQuery(query: FindManyOptions<T>): Promise<T[]> {
    return this.adapter.findByQuery(query);
  }


  /**
   * Update an entity by ID
   * @param id The ID of the entity to update
   * @param data The data to update the entity with
   */
  async update(id: string | number, data: DeepPartial<T>): Promise<T | null> {
    return this.adapter.update(id, data);
  }

  /**
   * Delete an entity by ID
   * @param id The ID of the entity to delete
   */
  async delete(id: string | number): Promise<boolean> {
    return this.adapter.delete(id);
  }
}
