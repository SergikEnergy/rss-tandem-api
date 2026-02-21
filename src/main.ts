import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EXPOSED_HEADERS, METHODS, ORIGINS } from './common/cors';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        bufferLogs: true,
        abortOnError: false,
    });
    app.enableCors({
        origin: ORIGINS,
        methods: METHODS,
        credentials: true,
        exposedHeaders: EXPOSED_HEADERS,
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
