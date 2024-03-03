import { gql } from "apollo-server";
export const customerTypeDefs = gql`
    scalar DateTime

    input DiaryFilterOpts {
        field: String!
        stringValue: String
        intValue: Int
    }

    type Query {
        fetchDiaries(take: Int!, skip: Int!): FetchDiariesResponse
        fetchDiaryByField(filter: DiaryFilterOpts!): FetchDiariesResponse
        fetchDiaryById(id: ID!): FetchDiaryResponse
    }

    type Mutation {
        createDiary(userId: ID!, title: String!): Diary
    }

    type Diary {
        createdAt: DateTime!
        updatedAt: DateTime
        deletedDate: DateTime;
        version: Int!;
        id: ID!
        userId: ID!
        title: String!
        notes: [DiaryNote!]!
    }

    type FetchDiaryResponse {
        code: Int!
        success: Boolean!
        message: String
        data: Diary
    }

    type FetchDiariesResponse {
        code: Int!
        success: Boolean!
        message: String
        data: [Diary]
        count: Int
    }
`;
