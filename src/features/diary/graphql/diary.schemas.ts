import gql from "graphql-tag";

export const diaryTypeDefs = gql`
    scalar DateTime

    input DiaryFilterOpts {
        field: String!
        stringValue: String
        intValue: Int
    }

    type Query {
        readDiaries(take: Int!, skip: Int!): ReadDiariesResponse
        # readDiaryByField(filter: DiaryFilterOpts!): ReadDiariesResponse
        readDiaryById(id: ID!): ReadDiaryResponse
    }

    type Mutation {
        createDiary(userId: ID!, title: String!): ReadDiaryResponse
        updateDiary(id: ID!, userId: String, title: String): ReadDiaryResponse
        deleteDiary(id: ID!): DeleteResponse
    }

    type Diary {
        createdDate: DateTime!
        updatedDate: DateTime
        deletedDate: DateTime
        version: Int!
        id: ID!
        userId: ID!
        title: String!
        notes: [DiaryNote]!
    }

    type ReadDiaryResponse {
        code: Int!
        success: Boolean!
        message: String
        data: Diary
    }

    type ReadDiariesResponse {
        code: Int!
        success: Boolean!
        message: String
        data: [Diary]
        count: Int
    }
`;
