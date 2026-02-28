import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { METHODS, ORIGINS } from './common/cors';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_TAGS } from './common/constants';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

const swaggerConfig = new DocumentBuilder()
    .setTitle('API for RSS Tandem <<RSS - 2026>>')
    .setDescription('created with nestJS')
    .setVersion('1.0.0')
    .addTag(SWAGGER_TAGS.HEALTH)
    .addTag(SWAGGER_TAGS.AUTH)
    .addTag(SWAGGER_TAGS.USER)
    .build();

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
        abortOnError: false,
    });

    app.enableCors({
        origin: ORIGINS,
        methods: METHODS,
        credentials: true,
    });

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            stopAtFirstError: false,
            transform: true,
        }),
    );

    const documentFactory = () =>
        SwaggerModule.createDocument(app, swaggerConfig, {
            include: [HealthModule, UsersModule, AuthModule],
        });

    SwaggerModule.setup('doc', app, documentFactory);

    await app.listen(process.env.PORT ?? 8080);
}

bootstrap();
