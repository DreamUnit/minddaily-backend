import { userTypeDefs } from "./user/graphql/user.schemas";
import { diaryNoteTypeDefs } from "./diary-notes/graphql/diaryNotes.schemas";
import { diaryTypeDefs } from "./diary/graphql/diary.schemas";

export const typeDefs = [userTypeDefs, diaryNoteTypeDefs, diaryTypeDefs];
