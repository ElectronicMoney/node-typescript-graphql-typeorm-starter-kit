import {Arg, Ctx, Field, Mutation, ObjectType, Query, Resolver } from 'type-graphql';
import {User} from "../entity/User";
import bcrypt, { compare } from 'bcryptjs';
import {getManager} from "typeorm";
import { CreateUserInput } from './CreateUserInput';
import { Auth } from '../Authentication/Auth';
import { AppContext } from '../AppContext';

// The Login Response Oject Type
@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string;
}


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


    // Login Mutation!
    @Mutation(() => LoginResponse)
    async login(
      @Arg('email') email: string,
      @Arg('password') password: string,
      @Ctx() {res}: AppContext
    ): Promise<LoginResponse> {
      
      // Get the User
      const user = await User.findOne({where: {email}});
      // Check if the user is found 
      if (!user) {
        throw new Error("Invalid Login Credentials; The Username or Password is Incorrect!");
      }

      // Compare the password
      const valid = await compare(password, user.password);

        // Check if the password  is valid 
      if (!valid) {
        throw new Error("Invalid Login Credentials; The Username or Password is Incorrect!");
      }

      // Create Access Token from JWT
      const auth = new Auth()

      // Pass Refresh Token to cookie
      res.cookie(
        'jid', 
        auth.createRefreshToken(user),
        {httpOnly: true}
      );

      // Return Access Token if login is successful
      return {
        accessToken: auth.createAccessToken(user)
      }
    
    }
}

