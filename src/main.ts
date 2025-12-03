import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';

require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'], // reduce verbosidad en prod
  });

  const bodyLimit = process.env.BODY_LIMIT ?? '20mb';
  app.use(json({ limit: bodyLimit }));
  app.use(urlencoded({ extended: true, limit: bodyLimit }));

 app.enableCors({
  origin: [
    'https://infecto-app-web-dashboard.vercel.app',
    'https://infecto-app-web-dashboard-eyeyirwhh-rhindets-projects.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
});

  const port = parseInt(process.env.PORT ?? '3000', 10);
  const host = '0.0.0.0'; // <- IMPORTANTE en Render

  await app.listen(port, host);
  console.log(`✅ Server listening on http://${host}:${port}`);
}
bootstrap();