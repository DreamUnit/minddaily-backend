import { gql } from "apollo-server";

export const customerTypeDefs = gql`
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

  type User {
    createdAt: DateTime!
    updatedAt: DateTime
    deletedDate: DateTime;
    version: Int!;
    id: ID!
    authUserId: String!
    email: String
    name: String
    diaries: [Diary]

  }
`;
