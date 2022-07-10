import { IsNotEmpty, IsString } from 'class-validator'


export class CreateRole {
   @IsString()
   @IsNotEmpty()
   value: string
}