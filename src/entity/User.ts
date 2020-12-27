import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {ObjectType, Field, ID} from 'type-graphql';


@ObjectType()
@Entity()
export class User extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Field(() => String)
    @Column('text')
    firstName: string | undefined;

    @Field(() => String)
    @Column('text')
    lastName: string | undefined;

    @Field(() => String)
    @Column('text', {unique:true})
    username: string | undefined;

    @Field(() => String)
    @Column('text', {unique: true})
    email: string | undefined;

    @Field(() => String)
    @Column('text')
    password: string | undefined;

}