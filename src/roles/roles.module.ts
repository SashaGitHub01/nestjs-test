import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Role } from 'src/models/role.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
   imports: [
      SequelizeModule.forFeature([Role])
   ],

   exports: [
      RolesService,
   ],

   controllers: [
      RolesController,
   ],

   providers: [
      RolesService,
   ]
})
export class RolesModule { }
