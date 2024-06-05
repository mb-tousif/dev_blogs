import { hashPasswordHelper } from "../utils/bcryptHelper";
import IUserInfo  from "../types/user";
import { GraphQLError } from "graphql";

const userResolver = {
  Query: {
    hello: () => "Hello World",
  },
  Mutation: {
    signUp: async (parent: any, args: IUserInfo, { prisma }: any) => {
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: args.email },
        });
        if (existingUser) {
        throw new GraphQLError("User already exists")
        }
        args.password = await hashPasswordHelper.hashPassword(args.password);
        console.log(args);
        
        const newUser = await prisma.user.create({
          data: args,
        });
        console.log(newUser);
        
        return newUser;
      } catch (err) {
        throw new Error("Internal server error");
      }
    },
  },
};

export default userResolver;
