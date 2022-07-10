import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
import { JwtStrategy } from 'src/passport/jwt.strategy';
import { LocalStrategy } from 'src/passport/local.strategy';
import { RolesModule } from 'src/roles/roles.module';
import { RolesService } from 'src/roles/roles.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
   imports: [
      // MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      PassportModule,
      SequelizeModule.forFeature([User, Role]),
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: `${process.env.SECRET}`,
            signOptions: { expiresIn: '5min' },
         }),
      }),
      RolesModule
   ],

   exports: [
      UsersService,
   ],

   controllers: [UsersController],

   providers: [
      UsersService,
      JwtStrategy
   ]
})
export class UsersModule { }
