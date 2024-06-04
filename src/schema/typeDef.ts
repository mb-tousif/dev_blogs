import { mergeTypeDefs } from "@graphql-tools/merge";
import userTypeDef from "./userSchema";

// typeDefs

const mergedTypeDefs = mergeTypeDefs([userTypeDef]);

export default mergedTypeDefs;
