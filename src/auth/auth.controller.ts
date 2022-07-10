import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Request } from 'express'
import { CreateUser } from 'src/dtos/createUser.dto';

@Controller('auth')
export class AuthController {
   constructor(
      private authService: AuthService
   ) { }

   @UseGuards(LocalAuthGuard)
   @Post('/login')
   async login(@Req() req: Request) {
      return this.authService.login(req.user);
   }

   @Post('/register')
   async register(@Body(new ValidationPipe()) userDto: CreateUser) {
      return this.authService.register(userDto);
   }
}
