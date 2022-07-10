import { Column, Model, Table, ForeignKey } from "sequelize-typescript"
import Sequelize from "sequelize"
import { Role } from "./role.model"
import { User } from "./user.model"

export interface UserRolesAttributes {
   id: number,
   roleId: number,
   userId: number
}

@Table({ tableName: 'user_roles', timestamps: false })
export class UserRoles extends Model<UserRolesAttributes, UserRolesAttributes> {
   @Column({ type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true })
   id: number

   @ForeignKey(() => Role)
   @Column({ type: Sequelize.INTEGER })
   role: number

   @ForeignKey(() => User)
   @Column({ type: Sequelize.INTEGER })
   user: number
}