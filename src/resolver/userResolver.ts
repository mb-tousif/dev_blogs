import { hashPasswordHelper } from "../utils/bcryptHelper";
import IUserInfo  from "../types/user";
import { GraphQLError } from "graphql";
import { jwtHelper } from "../utils/jwtHelper";
import config from "../config";

const userResolver = {
  Query: {
    getAllUser: async (parent: any, args: any, { prisma }: any) => {
      // try {
      //   const users = await prisma.user.findMany();
      //   return users;
      // } catch (error) {
      //   console.error("Error fetching users:", error);
      //   throw new Error("Failed to fetch users. Please try again later.");
      // }
      const users = await prisma.user.findMany();
      if (!users) {
        throw new GraphQLError("No user found");
      }
      return users;
    }
  },
  Mutation: {
    signUp: async (parent: any, args: any, { prisma }: any) => {
     const { email, password, role } = args.input
      
      try {
        const existingUser = await prisma.user.findUnique({
          where: { email: email },
        });
        if (existingUser) {
        throw new GraphQLError("User already exists")
        }
        args.input.password = await hashPasswordHelper.hashPassword(password);
        // console.log(args);
        
        const newUser = await prisma.user.create({
          data: args.input,
        });
        // console.log(newUser);
        
        return newUser;
      } catch (err) {
        console.log(err);
      }
    },
    login : async (parent: any, args: any, { prisma }: any) => {
      const { email, password } = args.input;
      try {
        const user = await prisma.user.findUnique({
          where: { email: email },
        });
        if (!user) {
          throw new GraphQLError("User not found");
        }
        const isPasswordValid = await hashPasswordHelper.comparePassword(
          password,
          user.password
        );
        if (!isPasswordValid) {
          throw new GraphQLError("Invalid password");
        }
        const AccessToken = jwtHelper.generateToken({
          userId: user.id,
          email: user.email,
        },
        config.jwt.secret as string);
        return {
          token: AccessToken,
          userError: null,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default userResolver;
