import { IsString, MinLength } from 'class-validator'

export class CreateUser {
   @IsString()
   @MinLength(2, { message: 'Minimal length is $constraint1 characters.' })
   username: string

   @IsString()
   @MinLength(3, { message: 'Minimal length is $constraint1 characters.' })
   password: string
}