import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
import { RolesModule } from 'src/roles/roles.module';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
   imports: [
      SequelizeModule.forFeature([User, Role]),
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: `${process.env.SECRET}`,
            signOptions: { expiresIn: '5min' },
         }),
      }),
      RolesModule,
      UsersModule
   ],

   controllers: [AuthController],

   providers: [
      AuthService
   ],
})
export class AuthModule { }
