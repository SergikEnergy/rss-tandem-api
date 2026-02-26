import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { isProduction } from './common/envs';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: isProduction ? '.env' : '.env',
            isGlobal: true,
        }),
        HealthModule,
        UsersModule,
        DatabaseModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
