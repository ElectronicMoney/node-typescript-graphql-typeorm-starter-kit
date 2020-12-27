import {Arg, Mutation, Query, Resolver } from 'type-graphql';
import {User} from "../entity/User";
import bcrypt from 'bcryptjs';
import {getManager} from "typeorm";
import { CreateUserInput } from './CreateUserInput';


@Resolver()
export class UserResolver {
    private user: string = 'Get User Resolver!';

    @Query(() => String)
    async getUser() {
      return await this.user;
    }
  
    @Mutation(() => User)
    async createUser(
      @Arg('user') {firstName, lastName, email, username, password}: CreateUserInput
    ): Promise<User> {
      
      const entityManager = getManager(); // you can also get it via getConnection().manager
      const user = new User()

      user.firstName = firstName;
      user.lastName  = lastName;
      user.email     = email;
      user.username  = username;
      user.password = await bcrypt.hash(password, 10);

      const newUser = await entityManager.save(user);

      return newUser; 
    }
}

