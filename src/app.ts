import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";

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
App.use(express.json());
App.use(express.urlencoded({ extended: true }));
App.listen( () => {
  console.log(`🚀  Server ready at: ${url}`)
});
App.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Not Found",
    errorMessages: [
      {
        path: req.originalUrl,
        message: `🚦 Requested ${req.originalUrl} this Route Not Found 💥`,
      },
    ],
  });
  next();
});
}

main();