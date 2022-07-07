import { Body, Controller, Get, NotFoundException, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CreateUser } from 'src/dtos/createUser.dto';
import { JwtGuard } from 'src/guards/jwt.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
   constructor(private readonly usersService: UsersService) { }

   @Post()
   async create(@Body(new ValidationPipe()) userDto: CreateUser) {
      return this.usersService.create(userDto)
   }

   @UseGuards(JwtGuard)
   @Get()
   async findAll(@Req() req: Request) {
      console.log(req.user)
      return this.usersService.findAll()
   }

   // @UseGuards(AuthGuard('local'))
   @UseGuards(LocalAuthGuard)
   @Post('/login')
   async login(@Req() req: Request) {
      return this.usersService.login(req.user);
   }

   @Get(':id')
   async findOne(@Param('id') id: string) {
      const user = await this.usersService.findOne(id)
      if (!user) throw new NotFoundException('User not found')

      return user;
   }
}
