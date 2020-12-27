import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {ObjectType, Field, ID} from 'type-graphql';


@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column('text')
    firstName!: string;

    @Field(() => String)
    @Column('text')
    lastName!: string;

    @Field(() => String)
    @Column('text', { unique: true })
    username!: string;

    @Field(() => String)
    @Column('text', { unique: true })
    email!: string;

    @Field(() => String)
    @Column('text')
    password!: string;

}