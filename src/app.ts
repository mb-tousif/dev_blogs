import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import config from "./config";
import mergedTypeDefs from "./schema/typeDef";
import mergedResolvers from "./resolver";
import { jwtHelper } from "./utils/jwtHelper";
import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";


const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
});

interface Context {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  userInfo: {
    userId: number | null;
  } | null;
}

const main = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: Number(`${config.port}`) },
    context: async ({ req }): Promise<Context> => {
      const userInfo = await jwtHelper.getUserInfoFromToken(
        req.headers.authorization as string
      );
      return {
        prisma: new PrismaClient(),
        userInfo,
      };
    },
  });
  console.log(`🚀  ${config.app_name} App Server is Running on ${url}`)
}

main().catch(error => {
  console.log("Something went wrong: ", error);
});