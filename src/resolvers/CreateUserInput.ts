import { MaxLength, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { Field, InputType } from "type-graphql";
import { IsEmailAlreadyExist } from "../modules/IsEmailAlreadyExist";
import { IsUsernameAlreadyExist } from "../modules/IsUsernameAlreadyExist";

@InputType()
export class CreateUserInput {

  @IsNotEmpty()
  @MaxLength(100)
  @Field()
  firstName!: string;

  @IsNotEmpty()
  @MaxLength(100)
  @Field()
  lastName!: string;

  @IsNotEmpty()
  @IsEmail()
  @IsEmailAlreadyExist({message: "The Email Already Exist; choose another email address!"})
  @Field()
  email!: string;

  @IsNotEmpty()
  @MaxLength(20)
  @IsUsernameAlreadyExist({message: "The Username Already Exist; choose another username!"})
  @Field()
  username!: string;

  @IsNotEmpty()
  @MinLength(8)
  @Field()
  password!: string;
}