import { books } from './Models/Book'
import {getManager} from "typeorm";
import {User} from "./entity/User";
import bcrypt from 'bcryptjs';


// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
export const resolvers = {
    Query: {
      books: () => books,

      async getUser(parent:any, args:any, context:any, info:any) {

        const entityManager = getManager(); // you can also get it via getConnection().manager
        const user = await entityManager.findOne(User, args.id);
        return  user
      }, 

    },


    Mutation: {
      async createUser(parent:any, args:any, context:any, info:any) {

        const entityManager = getManager(); // you can also get it via getConnection().manager
        const user = new User()

        user.firstName = args.firstName;
        user.lastName  = args.lastName;
        user.email     = args.email;
        user.username  = args.username;
        user.password = await bcrypt.hash(args.password, 10);

        const newUser = await entityManager.save(user);

        console.log(newUser);

        return newUser;
      } 
    }


};
  