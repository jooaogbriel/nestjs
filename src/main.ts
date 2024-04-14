import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Cria uma instância do aplicativo
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3004); // Inicia o aplicativo na porta 3000
}
bootstrap(); // Chama a função bootstrap() para iniciar o aplicativo
