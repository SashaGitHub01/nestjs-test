import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { User, UserSchema } from 'src/models/user.model';
import { JwtStrategy } from 'src/passport/jwt.strategy';
import { LocalStrategy } from 'src/passport/local.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
   imports: [
      MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      PassportModule,
      JwtModule.registerAsync({
         useFactory: () => ({
            secret: `${process.env.SECRET}`,
            signOptions: { expiresIn: '5min' },
         }),
      }),
   ],

   controllers: [UsersController],

   providers: [
      UsersService,
      LocalStrategy,
      JwtStrategy
   ]
})
export class UsersModule { }
