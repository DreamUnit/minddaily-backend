import { gql } from "apollo-server";

export const userTypeDefs = gql`
    scalar DateTime

    input UserFilterOpts {
        field: String!
        stringValue: String
        intValue: Int
    }

    type Query {
        fetchUsers(take: Int!, skip: Int!): FetchUsersResponse
        fetchUsersByField(filter: UserFilterOpts!): FetchUsersResponse
        fetchUserById(id: ID!): FetchUserResponse
    }

    type Mutation {
        createDiaryNote(userId: ID!, title: String!): Diary
    }

    type User {
        createdAt: DateTime!
        updatedAt: DateTime
        deletedDate: DateTime
        version: Int!
        id: ID!
        authUserId: String!
        email: String
        name: String
        diaries: [Diary]
    }

    type FetchUserResponse {
        code: Int!
        success: Boolean!
        message: String
        data: User
    }

    type FetchUsersResponse {
        code: Int!
        success: Boolean!
        message: String
        data: [User]
        count: Int
    }
`;
