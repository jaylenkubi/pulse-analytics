import { Repository, DeepPartial, FindOptionsWhere, FindManyOptions } from 'typeorm';

export class TypeOrmAdapter<T> {
  constructor(private readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findById(id: string | number): Promise<T | null> {
    return this.repository.findOne({ where: { id } as unknown as FindOptionsWhere<T> });
  }

  async findAll(): Promise<T[]> {
    return this.repository.find({ where: {} as FindOptionsWhere<T> });
  }
  
  async findByQuery(query: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find(query);
  }

  async update(id: string | number, data: DeepPartial<T>): Promise<T | null> {
    await this.repository.update(id, data as any);
    return this.findById(id);
  }

  async delete(id: string | number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected > 0;
  }

  getRepository(): Repository<T> {
    return this.repository;
  }
}
