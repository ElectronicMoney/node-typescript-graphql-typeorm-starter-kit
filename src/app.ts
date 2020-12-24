import express, {Application} from 'express';
import {createConnection, Connection} from "typeorm";
import { ApolloServer } from 'apollo-server-express';
import {typeDefs } from './schema';
import {resolvers } from './resolvers';

// here createConnection will load connection options from
// ormconfig.json / ormconfig.js / ormconfig.yml / ormconfig.env / ormconfig.xml
// files, or from special environment variables
export const startServer = async () => {
    const connection: Connection = await createConnection();

    const PORT = 5000;
    const app:Application = express();


    const server = new ApolloServer({ typeDefs, resolvers });

    server.applyMiddleware({ app, path:'/graphql' });


    app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));

}


// Start the Server here...
startServer()