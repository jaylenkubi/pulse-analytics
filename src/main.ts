import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as fs from 'fs';

async function bootstrap() {
  const logger = new Logger('Server');

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: false // Disable Fastify's built-in logger
    }),
    {
      logger: ['log', 'error', 'warn', 'debug', 'verbose'], // Enable all NestJS log levels
    }
  );

  // Enable CORS for the frontend
  await app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3001', // Next.js typically runs on 3001
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
  }));

  const config = new DocumentBuilder()
    .setTitle('Pulse Analytics')
    .setDescription('Pulse Analytics API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  fs.writeFileSync('./swagger.json', JSON.stringify(document, null, 2));

  await app.listen(process.env.PORT ?? 3000, 'localhost');
  logger.log(`Server is listening on port ${process.env.PORT ?? 3000}`);
  logger.log(`Server documentation is available at http://localhost:${process.env.PORT ?? 3000}/api`);
}
bootstrap();
