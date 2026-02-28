import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { isProduction } from './common/envs';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './modules/database/database.module';
import { LoggerModule } from './modules/logger/logger.module';
import { LoggerService } from './modules/logger/logger.service';
import { LoggerMiddleware } from './modules/logger/logger.middleware';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: isProduction ? '.env' : '.env.dev',
            isGlobal: true,
        }),
        HealthModule,
        UsersModule,
        DatabaseModule,
        LoggerModule,
        AuthModule,
    ],
    controllers: [],
    providers: [LoggerService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).exclude('/doc', 'doc').forRoutes('*');
    }
}
