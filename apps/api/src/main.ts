import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());

    app.setGlobalPrefix('api');
    const port = process.env.API_PORT || 3000;
    await app.listen(port);

    Logger.log(`🚀 Application is running here:http://localhost:${port}/api`);
}

bootstrap();
