import { gql } from "apollo-server";
import { userTypeDefs } from "./User";
import { diaryNoteTypeDefs } from "./DiaryNotes";
import { diaryTypeDefs } from "./Diary";
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

export const typeDefs = [
    mockTypeDefs,
    userTypeDefs,
    diaryNoteTypeDefs,
    diaryTypeDefs,
];
