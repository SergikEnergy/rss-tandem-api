import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { METHODS, ORIGINS } from './common/cors';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_TAGS } from './common/constants';
import { HealthModule } from './modules/health/health.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { DatabaseExceptionFilter } from './common/filters/database-exception.filter';
import { QuizzesModule } from './modules/quizzes/quizzes.module';

const swaggerConfig = new DocumentBuilder()
    .setTitle('API for RSS Tandem <<RSS - 2026>>')
    .setDescription('created with nestJS')
    .setVersion('1.0.0')
    .addTag(SWAGGER_TAGS.HEALTH)
    .addTag(SWAGGER_TAGS.AUTH)
    .addTag(SWAGGER_TAGS.USER)
    .addTag(SWAGGER_TAGS.QUIZZES)
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

    app.useGlobalFilters(new DatabaseExceptionFilter());

    app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

    const documentFactory = () =>
        SwaggerModule.createDocument(app, swaggerConfig, {
            include: [HealthModule, UsersModule, AuthModule, QuizzesModule],
        });

    SwaggerModule.setup('doc', app, documentFactory);

    await app.listen(process.env.PORT ?? 8080);
    setTimeout(() => {
        throw new Error('CRASHHHHH+++++++');
    }, 10000);
}

bootstrap();
