import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { createGenericController } from '@shared/factory/generic-crud.controller.factory';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { Session } from 'src/entities/session.entity';
import { Repository } from 'typeorm';

const SessionController = createGenericController<Session>('sessions');

const sessionService = {
    provide: 'SESSIONS_SERVICE',
    useFactory: (repository: Repository<Session>) => createGenericService(repository),
    inject: [getRepositoryToken(Session)],
};

@Module({
    imports: [
        TypeOrmModule.forFeature([Session])
    ],
    controllers: [
        SessionController
    ],
    providers: [
        sessionService
    ],
    exports: [
        sessionService
    ]
})
export class SessionModule { }
