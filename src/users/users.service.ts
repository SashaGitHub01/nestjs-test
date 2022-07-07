import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser } from 'src/dtos/createUser.dto';
import * as bcrypt from 'bcryptjs'
import { User, UserDocument } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
   constructor(
      @InjectModel(User.name) private UserModel: Model<UserDocument>,
      private jwt: JwtService,
   ) { }

   async create(userDto: CreateUser): Promise<User> {
      const check = await this.UserModel.findOne({ username: userDto.username });
      if (check) {
         throw new BadRequestException('User with this name already exist')
      }

      const hash = await bcrypt.hash(userDto.password, 7)

      const user = await this.UserModel.create({
         ...userDto,
         password: hash
      });

      return user;
   }

   async findAll(): Promise<User[]> {
      const users = await this.UserModel.find();
      return users
   }

   async findOne(id: string): Promise<User> {
      const user = await this.UserModel.findById(id);
      return user;
   }

   async login(user: any) {
      const payload = { username: user.username, id: user.id };
      return {
         token: this.jwt.sign(payload),
      };
   }

   async validateUser(username: string, password: string) {
      const user = await this.UserModel.findOne({ username });
      if (!user) {
         throw new NotFoundException('User not found');
      }

      const check = await bcrypt.compare(password, user.password);
      if (!check) {
         throw new UnauthorizedException('Invalid username or password');
      }

      return user;
   }
}
