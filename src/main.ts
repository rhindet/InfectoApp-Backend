import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config();

async function bootstrap() {
const app = await NestFactory.create(AppModule, {
  logger: ['log', 'error', 'warn', 'debug', 'verbose'],
});  

app.enableCors({
    origin: process.env.CORS_ORIGIN || "*", // "*" permite todos (solo dev)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // si vas a mandar cookies/autenticación
  }); 
await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
