import gql from "graphql-tag";

export const diaryNoteTypeDefs = gql`
    scalar DateTime

    input DiaryNoteFilterOpts {
        field: String!
        stringValue: String
        intValue: Int
    }

    type Query {
        readDiaryNotes(take: Int!, skip: Int!): ReadDiaryNotesResponse
        # readDiaryNotesByField(
        #     filter: DiaryNoteFilterOpts!
        # ): ReadDiaryNotesResponse
        readDiaryNoteById(id: ID!): ReadDiaryNoteResponse
    }

    type Mutation {
        createDiaryNote(
            title: String!
            text: String!
            diaryId: ID!
        ): ReadDiaryNoteResponse
        updateDiaryNote(
            id: ID!
            title: String!
            text: String
        ): ReadDiaryNoteResponse
        deleteDiaryNote(id: ID!): DeleteResponse
    }

    type Image {
        url: String!
        title: String
    }

    type DiaryNote {
        createdDate: DateTime!
        updatedDate: DateTime
        deletedDate: DateTime
        version: Int!
        id: ID!
        diaryId: ID!
        title: String!
        text: String
        images: [Image]!
    }

    type ReadDiaryNoteResponse {
        code: Int!
        success: Boolean!
        message: String
        data: DiaryNote
    }

    type ReadDiaryNotesResponse {
        code: Int!
        success: Boolean!
        message: String
        data: [DiaryNote]
        count: Int
    }

    type DeleteResponse {
        code: Int!
        success: Boolean!
        message: String
    }
`;
