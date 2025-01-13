import { DataSource } from 'typeorm';
import { Event } from '../entities/event.entity';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './env.config';

ConfigModule.forRoot({
    load: [envConfig],
});

export default new DataSource({
    type: 'postgres',
    host: process.env.TIMESCALE_HOST,
    port: parseInt(process.env.TIMESCALE_PORT || '5432', 10),
    username: process.env.TIMESCALE_USER,
    password: process.env.TIMESCALE_PASSWORD,
    database: process.env.TIMESCALE_DB,
    entities: [Event],
    migrations: ['src/migrations/*.ts'],
    ssl: process.env.DB_SSL === 'true',
});
