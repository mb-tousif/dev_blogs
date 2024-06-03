import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import config from "./config";
import typeDefs from "./schema/typeDef";
import resolvers from "./resolver";

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