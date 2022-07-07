import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private userService: UsersService) {
      super();
   }

   async validate(username: string, password: string): Promise<any> {
      const user = await this.userService.validateUser(username, password);
      return user;
   }
}