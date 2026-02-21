import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { isProduction } from './common/envs';
import { HealthModule } from './modules/health/health.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: isProduction ? '.env' : '.env',
            isGlobal: true,
        }),
        HealthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
