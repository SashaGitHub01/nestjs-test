import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs'
import { CreateUser } from 'src/dtos/createUser.dto';
import { Role } from 'src/models/role.model';
import { User } from 'src/models/user.model';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
   constructor(
      @InjectModel(User) private UserModel: typeof User,
      private rolesService: RolesService,
      private usersService: UsersService,
      private jwt: JwtService,
   ) { }

   async login(user: any) {
      return {
         token: await this.generateToken(user)
      };
   }

   async register(userDto: CreateUser): Promise<{ token: string }> {
      const user = await this.usersService.create(userDto)
      return {
         token: await this.generateToken(user)
      }
   }


   async validateUser(username: string, password: string) {
      const user = await this.UserModel.findOne({ where: { username }, include: Role });
      if (!user) {
         throw new NotFoundException('User not found');
      }

      const check = await bcrypt.compare(password, user.password);
      if (!check) {
         throw new UnauthorizedException('Invalid username or password');
      }

      return user;
   }

   async generateToken(user: any) {
      const payload = { username: user.username, id: user.id, roles: user.roles };
      return this.jwt.sign(payload);
   }
}
