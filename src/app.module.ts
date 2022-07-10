import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Role } from './models/role.model';
import { UserRoles } from './models/userRoles.model';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: '.env'
      }),
      MongooseModule.forRoot(process.env.DB),
      SequelizeModule.forRoot({
         dialect: 'postgres',
         host: process.env.DB_HOST,
         port: +process.env.DB_PORT,
         username: process.env.DB_USER,
         password: process.env.DB_PASSWORD,
         database: process.env.DB_NAME,
         models: [User, Role, UserRoles],
         autoLoadModels: true,
         synchronize: true
      }),
      UsersModule,
      RolesModule,
      AuthModule
   ],

   controllers: [],

   providers: [],
})
export class AppModule { }
