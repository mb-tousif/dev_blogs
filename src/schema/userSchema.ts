
const userTypeDef = `#graphql
  type Query {
    hello: String
  }
  type User {
    id: ID
    email: String!
    password: String!
    role: String!
    # blog: [Blog]
    # comment: [Comment]
  }

  type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): AuthPayload
  }

  input SignUpInput {
    email: String!
    password: String!
    role: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    userError: String
    token: String
  }

  # type PostPayload {
  #     userError: String
  #     post: Blog
  # }
`;

export default userTypeDef;
