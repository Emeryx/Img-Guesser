/* eslint-disable prettier/prettier */

// NextFactory is a class used to create an instance of a Nest application
// NextFactory provides a static method "create()" that initializes the application based on the provided root module class
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Returns a nest application object
  // CORS Enables other domains to interact with the backend
  app.enableCors({ 
    origin: 'http://localhost:5173',  // Replace with the correct URL of your React app
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  await app.listen(3000); 
}
bootstrap();
