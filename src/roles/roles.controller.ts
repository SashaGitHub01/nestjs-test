import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateRole } from 'src/dtos/createRole.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
   constructor(private readonly rolesService: RolesService) { }

   @Post()
   async create(@Body() data: CreateRole) {
      return await this.rolesService.create(data)
   }

   @Get('/:name')
   async getRoleByValue(@Param('name') name: string) {
      return await this.rolesService.getRoleByValue(name)
   }

   @Get()
   async getRoles() {
      return await this.rolesService.getRoles()
   }
}
