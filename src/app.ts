import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { expressMiddleware } from "@apollo/server/express4";

const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    books: () => books,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const main = async () => {
  const App: Application = express();
  const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});
App.use(cors());

//parser
 App.use(bodyParser.json());
 App.use(bodyParser.urlencoded({ extended: true }));
 App.use( expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
App.listen( () => {
  console.log(`🚀  Server ready at: ${url}`)
});
}

main().catch(error => {
  console.log('Error starting the server:', error);
});