import * as dotenv from 'dotenv'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoDbModule } from './database/mongodb.module';
dotenv.config();

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // await MongoDbModule.connectDB();
  await app.listen(3000);
}
bootstrap();
