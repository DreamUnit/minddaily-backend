import { diaryResolvers } from "./diary/graphql/diary.resolvers";
import { diaryNotesResolvers } from "./diary-notes/graphql/diaryNotes.resolvers";
import { userResolvers } from "./user/graphql/user.resolvers";

export const resolvers = [userResolvers, diaryResolvers, diaryNotesResolvers];
