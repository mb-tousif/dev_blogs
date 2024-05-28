import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import config from "./config";

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
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(`${config.port}`) },
  });
  console.log(`🚀  ${config.app_name} App Server is Running on ${url}`)
}

main().catch(error => {
  console.log("Something went wrong: ", error);
});