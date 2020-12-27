import * as dotenv from 'dotenv';
import express, {Application} from 'express';
import {createConnection, Connection} from "typeorm";
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from "./resolvers/index";


// here createConnection will load connection options from
// ormconfig.json / ormconfig.js / ormconfig.yml / ormconfig.env / ormconfig.xml
// files, or from special environment variables
export const startServer = async () => {
    dotenv.config()
    dotenv.config({ path: __dirname+'../.env' });
    

    const connection: Connection = await createConnection();

    const PORT = process.env.PORT;
    const app:Application = express();


  
    // ...
    const schema = await buildSchema({
        resolvers: [
            UserResolver
        ],
    });


    const server = new ApolloServer({ schema });

    server.applyMiddleware({ app, path:'/graphql' });


    app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

}


// Start the Server here...
startServer()