import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import Sequelize from 'sequelize';
import { UserRoles } from './userRoles.model';
import { Role } from './role.model';

export interface UserAttributes {
   id: number
   username: string;
   password: string;
}

@Table
export class User extends Model<UserAttributes, UserAttributes> {
   @Column({
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
   })
   id: number

   @Column({
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
         notEmpty: true,
         len: {
            args: [3, 200],
            msg: 'Please provide field within 2 to 200 characters.'
         }
      }
   })
   username: string;

   @Column({
      type: Sequelize.STRING,
      allowNull: false,
   })
   password: string;

   @BelongsToMany(() => Role, () => UserRoles)
   roles: Role[]
}



// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// export type UserDocument = User & Document;

// export enum UserRolesEnum {
//    admin = 'admin',
//    user = 'user'
// }

// export const userRoles: UserRolesEnum[] = [UserRolesEnum.admin, UserRolesEnum.user]

// @Schema()
// export class User {
//    @Prop({
//       required: true,
//       unique: true
//    })
//    username: string;

//    @Prop({
//       required: true,
//       minlength: 3
//    })
//    password: string;

//    @Prop({
//       enum: userRoles,
//       default: [UserRolesEnum.user],
//       type: [String]
//    })
//    role: UserRolesEnum[];
// }

// export const UserSchema = SchemaFactory.createForClass(User);