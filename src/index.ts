import "reflect-metadata";
import { buildSchema } from "type-graphql";
import * as express from "express";
import * as http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";

import { ExampleResolver } from "./ExampleResolver";

const port = parseInt(process.env.PORT) || 8080;

async function bootstrap() {
  const app = express();
  const httpServer = http.createServer(app);

  const schema1 = await buildSchema({
    resolvers: [ExampleResolver],
  });

  const schema2 = await buildSchema({
    resolvers: [ExampleResolver],
  });

  const plugins = [ApolloServerPluginDrainHttpServer({ httpServer })];

  const graphQLServer1 = new ApolloServer({
    plugins,
    schema: schema1,
  });

  const graphQLServer2 = new ApolloServer({
    plugins,
    schema: schema2,
  });

  await graphQLServer1.start();
  await graphQLServer2.start();

  graphQLServer1.applyMiddleware({ app, path: "/graphql1" });
  graphQLServer2.applyMiddleware({ app, path: "/graphql2" });

  httpServer.listen({ port }, () => {
    console.log(`API started on port ${port}`);
  });
}

bootstrap();
