import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT')),
    database: configService.get('DB_NAME'),
    username: configService.get('DB_USER'),
    password: configService.get('DB_PASSWORD'),
    synchronize: false,
    entities: ['**/*.entity.ts'],
    migrations: ['src/modules/database/migrations/*-migration.ts'],
    migrationsRun: false,
    logging: true,
});

export default AppDataSource;
