import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { isProduction } from '../../common/envs';
import { checkEnvExist } from '../../utils/check-env-exist';
import { GetAsyncTypeOrmConfig } from '../../types/database';
import { getMetadataArgsStorage } from 'typeorm';

const checkDbEnv = (config: ConfigService): TypeOrmModuleOptions => {
    const dbEnvs = {
        host: config.get<string>('DB_HOST'),
        port: Number(config.get<string>('DB_PORT')),
        database: config.get<string>('DB_NAME'),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
    };
    checkEnvExist(dbEnvs);

    const { database, host, password, port, username } = dbEnvs;

    return {
        type: 'postgres',
        database,
        host,
        password,
        port,
        username,
        // Only enable this option if your application is in development,
        synchronize: !isProduction,
        autoLoadEntities: true,
        retryAttempts: 3,
        retryDelay: 3000,
        connectTimeoutMS: 20000,
        migrations: ['src/database/migrations/*-migration.ts'],
        migrationsRun: false,
        logging: isProduction ? ['error', 'warn'] : ['error'],
    };
};

export const getTypeormConfig: GetAsyncTypeOrmConfig = async (configService: ConfigService) => {
    const entities = getMetadataArgsStorage()
        .tables.map((tbl) => tbl.target)
        .filter((entity) => entity.toString().toLowerCase().includes('entity'));

    const configParams = checkDbEnv(configService);

    return {
        ...configParams,
        entities,
    };
};
