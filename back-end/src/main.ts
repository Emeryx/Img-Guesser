/* eslint-disable prettier/prettier */

// NextFactory is a class used to create an instance of a Nest application
// NextFactory provides a static method "create()" that initializes the application based on the provided root module class
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Returns a nest application object
  await app.listen(3000); 
}
bootstrap();
