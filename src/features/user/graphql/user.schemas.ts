import gql from "graphql-tag";

export const userTypeDefs = gql`
    input UserFilterOpts {
        field: String!
        stringValue: String
        intValue: Int
    }

    type Query {
        readUsers(take: Int!, skip: Int!): ReadUsersResponse
        readUserById(id: ID!): ReadUserResponse
    }

    type Mutation {
        createUser(
            authUserId: ID!
            email: String!
            name: String!
            locale: String!
        ): ReadUserResponse
        updateUser(
            id: ID
            name: String
            active: Boolean
            email: String
            points: Int
            locale: String
            permissions: [String]
        ): ReadUserResponse
        deleteUser(id: ID!): DeleteResponse
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
        permissions: [String]!
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

    type DeleteResponse {
        code: Int!
        success: Boolean!
        message: String
    }
`;
