// import { IsString, IsEnum, MinLength, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, IsArray, Validate, ArrayNotEmpty } from 'class-validator'
// import { userRoles, UserRolesEnum } from 'src/models/role.model';

// @ValidatorConstraint()
// export class IsRolesArray implements ValidatorConstraintInterface {
//    public async validate(rolesData: UserRolesEnum[], args: ValidationArguments) {
//       return Array.isArray(rolesData)
//          && rolesData.reduce((prev, role) => {
//             return prev && userRoles.includes(role)
//          }, true);
//    }
// }


// export class UpdateRole {
//    @IsArray()
//    @ArrayNotEmpty()
//    @Validate(IsRolesArray)
//    roles: UserRolesEnum[]
// }