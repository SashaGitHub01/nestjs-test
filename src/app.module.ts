import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: '.env'
      }),
      MongooseModule.forRoot(process.env.DB),
      UsersModule,
   ],

   controllers: [],

   providers: [],
})
export class AppModule { }
