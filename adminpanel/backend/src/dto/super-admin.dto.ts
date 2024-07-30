export class CreateSuperAdminDto {
    readonly username: string;
    readonly password: string;
    readonly email: string;
    readonly name: string;
    readonly role: string;
    readonly lastLogin?: Date;
    readonly permissions?: string[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}