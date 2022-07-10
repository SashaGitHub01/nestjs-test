import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUser } from 'src/dtos/createUser.dto';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/models/user.model';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/models/role.model';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
   constructor(
      @InjectModel(User) private UserModel: typeof User,
      private rolesService: RolesService,
      private jwt: JwtService,
   ) { }

   async create(userDto: CreateUser): Promise<User> {
      const check = await this.UserModel.findOne({ where: { username: userDto.username } });
      if (check) {
         throw new BadRequestException('User with this name already exist')
      }

      const hash = await bcrypt.hash(userDto.password, 7)

      const user = await this.UserModel.create({
         ...userDto,
         password: hash,
      });

      const role = await this.rolesService.getRoleByValue('user')
      await user.$set('roles', [role.id])
      user.roles = [role]

      return user;
   }

   async findAll(): Promise<User[]> {
      const users = await this.UserModel.findAll({ include: Role });
      return users
   }

   async findOne(id: string): Promise<User> {
      const user = await this.UserModel.findByPk(id);
      return user;
   }

   // async validateUser(username: string, password: string) {
   //    const user = await this.UserModel.findOne({ where: { username }, include: Role});
   //    if (!user) {
   //       throw new NotFoundException('User not found');
   //    }

   //    const check = await bcrypt.compare(password, user.password);
   //    if (!check) {
   //       throw new UnauthorizedException('Invalid username or password');
   //    }

   //    return user;
   // }


   // async updateRole(id: string, roleDto: UpdateRole): Promise<any> {
   //    const user = await this.UserModel.update({}, { where: { id }, returning: true });

   //    if (!user) {
   //       throw new BadRequestException('User doesn\'t exist')
   //    }

   //    return user;
   // }

   // async login(user: any) {
   //    const payload = { username: user.username, id: user.id };
   //    return {
   //       token: this.jwt.sign(payload),
   //    };
   // }
}
