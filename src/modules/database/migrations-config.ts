import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

const AppDataSource = new DataSource({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: Number(configService.get<string>('DB_PORT')),
    database: configService.get<string>('DB_NAME'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    synchronize: false,
    entities: ['**/*.entity.ts'],
    migrations: ['src/modules/database/migrations/*-migration.ts'],
    migrationsRun: false,
    logging: true,
});

export default AppDataSource;
