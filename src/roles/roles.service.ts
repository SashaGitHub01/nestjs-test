import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRole } from 'src/dtos/createRole.dto';
import { Role } from 'src/models/role.model';

@Injectable()
export class RolesService {
   constructor(
      @InjectModel(Role) private RoleModel: typeof Role,
   ) { }

   async create(createRoleDto: CreateRole): Promise<Role> {
      const isExist = await Role.findOne({ where: { value: createRoleDto.value } })
      if (isExist) {
         throw new BadRequestException('Role already exist')
      }

      return await Role.create({ ...createRoleDto })
   }

   async getRoleByValue(value: string): Promise<Role> {
      return await Role.findOne({ where: { value } })
   }

   async getRoles(): Promise<Role[]> {
      return await Role.findAll();
   }
}
