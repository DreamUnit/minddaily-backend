import { diaryResolvers } from "./diary.resolvers";
import { diaryNotesResolvers } from "./diaryNotes.resolvers";
import { userResolvers } from "./user.resolvers";

export const resolvers = [userResolvers, diaryResolvers, diaryNotesResolvers];
