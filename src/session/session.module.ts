import { Module } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { createGenericController } from '@shared/factory/generic-crud.controller.factory';
import { createGenericService } from '@shared/factory/generic-crud.service.factory';
import { Session } from 'src/entities/session.entity';
import { Repository } from 'typeorm';


const SessionController = createGenericController<Session>('sessions');

const sessionService = {
    provide: 'SESSION_SERVICE',
    useFactory: (repository: Repository<Session>) => createGenericService(repository),
    inject: [getRepositoryToken(Session)],
};


@Module({
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
