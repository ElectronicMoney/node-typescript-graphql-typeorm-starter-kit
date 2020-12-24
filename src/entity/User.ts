import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column('text')
    firstName: string | undefined;

    @Column('text')
    lastName: string | undefined;

    @Column('text')
    username: string | undefined;

    @Column('text')
    email: string | undefined;

    @Column('text')
    password: string | undefined;

}