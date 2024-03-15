import gql from "graphql-tag";

export const userTypeDefs = gql`
    scalar DateTime

    input UserFilterOpts {
        field: String!
        stringValue: String
        intValue: Int
    }

    type Query {
        readUsers(take: Int!, skip: Int!): ReadUsersResponse
        readUsersByField(filter: UserFilterOpts!): ReadUsersResponse
        readUserById(id: ID!): ReadUserResponse
    }

    type Mutation {
        createUser(
            authUserId: ID!
            email: String!
            name: String!
        ): ReadUserResponse
        updateUser(
            id: ID!
            name: String
            active: Boolean
            email: String
            points: Int
            locale: String
        ): ReadUserResponse
        deleteUser(id: ID!): ReadUserResponse
    }

    type User {
        createdDate: DateTime!
        updatedDate: DateTime
        deletedDate: DateTime
        version: Int!
        id: ID!
        authUserId: String!
        email: String
        name: String
        active: Boolean
        points: Int
        locale: String
        diaries: [Diary]
    }

    type ReadUserResponse {
        code: Int!
        success: Boolean!
        message: String
        data: User
    }

    type ReadUsersResponse {
        code: Int!
        success: Boolean!
        message: String
        data: [User]
        count: Int
    }
`;
