import { userTypeDefs } from "./user.schemas";
import { diaryNoteTypeDefs } from "./diaryNotes.schemas";
import { diaryTypeDefs } from "./diary.schemas";

export const typeDefs = [userTypeDefs, diaryNoteTypeDefs, diaryTypeDefs];
