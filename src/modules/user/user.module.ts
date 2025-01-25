import { Module } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { Repository } from 'typeorm';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { createGenericController } from '@shared/factory/generic-crud.controller.factory';
import { CacheModule } from '@nestjs/cache-manager';

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
