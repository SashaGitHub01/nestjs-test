import { Body, Controller, Get, NotFoundException, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from 'src/guards/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) { }

   // @Post()
   // async create(@Body(new ValidationPipe()) userDto: CreateUser) {
   //    return this.usersService.create(userDto)
   // }

   // @UseGuards(AuthGuard('local'))
   // @UseGuards(LocalAuthGuard)
   // @Post('/login')
   // async login(@Req() req: Request) {
   //    return this.usersService.login(req.user);
   // }

   // @Put('/role/:id')
   // async update(@Body(new ValidationPipe()) roleDto: UpdateRole, @Param('id') id: string) {
   //    return this.usersService.updateRole(id, roleDto)
   // }

   @UseGuards(JwtGuard)
   @Get()
   async findAll(@Req() req: Request) {
      return this.usersService.findAll()
   }

   @Get(':id')
   async findOne(@Param('id') id: string) {
      const user = await this.usersService.findOne(id)
      if (!user) throw new NotFoundException('User not found')

      return user;
   }
}

