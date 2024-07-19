// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/studentregistration', // Update with your MongoDB connection string
      entities: [User],
      synchronize: true, // Set to false in production
      useUnifiedTopology: true,
    }),
    UserModule,
  ],
})
export class AppModule {}
