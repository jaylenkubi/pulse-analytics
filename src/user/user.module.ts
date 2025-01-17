import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createGenericController } from '@shared/factory/generic-crud.controller.factory';

const UserController = createGenericController<User>('users');

const userService = {
  provide: 'USER_SERVICE',
  useFactory: (repository: Repository<User>) => createGenericService(repository),
  inject: [getRepositoryToken(User)],
}

@Module({
  controllers: [UserController],
  providers: [userService],
  exports: [userService]
})
export class UserModule { }
