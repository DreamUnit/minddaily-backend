import { diaryResolvers } from "./Diary";
import { diaryNotesResolvers } from "./DiaryNotes";
import { userResolvers } from "./User";

export const resolvers = [userResolvers, diaryResolvers, diaryNotesResolvers];
