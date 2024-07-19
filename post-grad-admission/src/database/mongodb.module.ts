import { Module } from '@nestjs/common';
import mongoose from 'mongoose';

@Module({})
export class MongoDbModule {
  static async connectDB() {
    try {
      await mongoose.connect(
        process.env.MONGO_URI || 'mongodb://localhost:27017/studentregistration'
      );

      console.log('MongoDB connection SUCCESS');
    } catch (error) {
      console.error('MongoDB connection FAIL');
      process.exit(1);
    }
  }
}
