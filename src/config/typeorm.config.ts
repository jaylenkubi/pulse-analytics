import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { envConfig } from './env.config';
import { join } from 'path';

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
    entities: [join(__dirname, '..', 'database', 'entities', '*.entity.{ts,js}')],
    migrations: [join(__dirname, '..', 'database', 'migrations', '*.ts')],
    ssl: process.env.DB_SSL === 'true',
});
