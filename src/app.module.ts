import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { isProduction } from './common/envs';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: isProduction ? '.env' : '.env',
            isGlobal: true,
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
