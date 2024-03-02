import { gql } from "apollo-server";
// temporary mock
export const mockTypeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
    }

    # The Query type, representing all of the entry points into our GraphQL API.
    type Query {
        users: [User!]!
    }

    # The Mutation type, representing all possible changes we can make to our data.
    type Mutation {
        addUser(username: String!, email: String!): User!
    }
`;

export const typeDefs = [mockTypeDefs];
