import gql from "graphql-tag";
export const diaryNoteTypeDefs = gql`
    scalar DateTime

    input DiaryNoteFilterOpts {
        field: String!
        stringValue: String
        intValue: Int
    }

    type Query {
        fetchDiaryNotes(take: Int!, skip: Int!): FetchDiaryNotesResponse
        fetchDiaryNotesByField(
            filter: DiaryNoteFilterOpts!
        ): FetchDiaryNotesResponse
        fetchDiaryNoteById(id: ID!): FetchDiaryNoteResponse
    }

    type Mutation {
        createDiaryNote(userId: ID!, title: String!): Diary
    }

    type Image {
        url: String!
        title: String
    }

    type DiaryNote {
        createdAt: DateTime!
        updatedAt: DateTime
        deletedDate: DateTime
        version: Int!
        id: ID!
        diaryId: ID!
        title: String!
        images: [Image]!
    }

    type FetchDiaryNoteResponse {
        code: Int!
        success: Boolean!
        message: String
        data: DiaryNote
    }

    type FetchDiaryNotesResponse {
        code: Int!
        success: Boolean!
        message: String
        data: [DiaryNote]
        count: Int
    }
`;
