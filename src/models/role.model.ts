import { BelongsToMany, Column, Table, Model } from "sequelize-typescript";
import Sequelize, { Optional, QueryInterface } from "sequelize";
import { User } from "./user.model";
import { UserRoles } from "./userRoles.model";

// export enum UserRolesEnum {
//    admin = 'admin',
//    user = 'user'
// }

// export const userRoles: UserRolesEnum[] = [UserRolesEnum.admin, UserRolesEnum.user]

export interface RoleAttributes {
   id: number,
   value: string,
}

interface RoleCreateAttributes extends Optional<RoleAttributes, 'id'> { }

@Table
export class Role extends Model<RoleAttributes, RoleCreateAttributes> {
   @Column({ type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true })
   id: number

   @Column({ type: Sequelize.STRING, unique: true, allowNull: false, })
   value: string

   @BelongsToMany(() => User, () => UserRoles)
   users: User[]
}