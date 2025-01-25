import { Module } from '@nestjs/common';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { createGenericController } from '@shared/factory/generic-crud.controller.factory';
import { CacheModule } from '@nestjs/cache-manager';
import { User } from '@entities/user.entity';

const UserController = createGenericController<User>('users');

const userService = {
  provide: 'USERS_SERVICE',
  useFactory: (repository: Repository<User>) => createGenericService(repository),
  inject: [getRepositoryToken(User)],
}

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    CacheModule.register()
  ],
  controllers: [UserController],
  providers: [userService],
  exports: [userService]
})
export class UserModule { }
