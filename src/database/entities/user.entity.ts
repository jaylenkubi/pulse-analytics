import { Role } from "../../modules/auth/enums/roles.enum";
import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({ name: 'user' })
export class User extends BaseEntity {
    @Column({type: 'varchar'})
    firstName: string;

    @Column({type: 'varchar'})
    lastName: string;
    
    @Column({type: 'varchar', unique: true})
    email: string;

    @Column({type: 'varchar'})
    password: string;

    @Column({ type: 'varchar', default: Role.USER })
    roles: Role;
}