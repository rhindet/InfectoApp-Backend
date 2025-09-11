import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express'; 


require('dotenv').config();

async function bootstrap() {
const app = await NestFactory.create(AppModule, {
  logger: ['log', 'error', 'warn', 'debug', 'verbose'],
});  

  // ⬅️ SUBE LÍMITES (ajusta a lo que necesites, p. ej. 5mb, 20mb, 50mb)
  const bodyLimit = process.env.BODY_LIMIT ?? '20mb';
  app.use(json({ limit: bodyLimit }));
  app.use(urlencoded({ extended: true, limit: bodyLimit }));



app.enableCors({
    origin: process.env.CORS_ORIGIN || "*", // "*" permite todos (solo dev)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // si vas a mandar cookies/autenticación
  }); 
await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
