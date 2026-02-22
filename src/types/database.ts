import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export type GetAsyncTypeOrmConfig = (...args: unknown[]) => Promise<TypeOrmModuleOptions>;
