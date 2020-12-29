import {
  Arg, 
  Ctx, 
  Field, 
  Mutation, 
  ObjectType, 
  Query, 
  Resolver, 
  UseMiddleware 
} from 'type-graphql';

import {User} from "../entity/User";
import bcrypt, { compare } from 'bcryptjs';
import { CreateUserInput } from '../UsersService/CreateUserInput';
import { Auth } from '../Authentication/Auth';
import { AppContext } from '../AppContext';
import { AuthMiddleware } from '../middlewares/AuthMiddleware';

// The Login Response Oject Type
@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string;
}


@Resolver()
export class UserResolver {

    // Get User Query
    @Query(() => User)
    @UseMiddleware(AuthMiddleware)
    async getProfile(
      @Ctx() {payload}: AppContext
    ): Promise<User> {
      // Return The user Id
      // return `Your User Id is ${payload!.userId}`;
      const id = payload!.userId;
      // Get the User
      const user = await User.findOne({where: {id}});
      // Check if the user is found 
      if (!user) {
         throw new Error("No User found for the given id!");
       }
       // Return The user
       return user;

    }

  // Get User Query
    @Query(() => User)
    async getUser(
      @Arg('username') username: string,
    ): Promise<User> {
       // Get the User
       const user = await User.findOne({where: {username}});
       // Check if the user is found 
       if (!user) {
        throw new Error("No User found for the given username!");
      }
      // Return The user
      return user;
    }
  
    // Create User Mutatation
    @Mutation(() => User)
    async createUser(
      @Arg('user') {firstName, lastName, email, username, password}: CreateUserInput
    ): Promise<User> {
      
      // Create the instance of a User
      const user = new User()

      user.firstName = firstName;
      user.lastName  = lastName;
      user.email     = email;
      user.username  = username;
      user.password = await bcrypt.hash(password, 10);

      const newUser = await user.save();

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

