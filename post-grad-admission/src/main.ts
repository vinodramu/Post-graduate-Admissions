import * as dotenv from 'dotenv'

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongoDbModule } from './database/mongodb.module';
dotenv.config();

async function bootstrap() {
  try {
    console.log('Starting application...');
    const app = await NestFactory.create(AppModule);
    console.log('Application module created');
    app.enableCors();
    console.log('CORS enabled');
    // Uncomment if MongoDB connection is needed
    // await MongoDbModule.connectDB();
    // console.log('Connected to MongoDB');
    const port = 3000;
    const host = '192.168.0.109';
    await app.listen(port, host);
    console.log(`Application listening on ${host}:${port}`);
  } catch (error) {
    console.error('Error starting application', error);
  }
}
bootstrap();