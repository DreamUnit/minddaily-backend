import { DiaryResolver } from "./diary/graphql/diary.resolvers";
import { DiaryNotesResolver } from "./diary-notes/graphql/diaryNotes.resolvers";
import { UserResolver } from "./user/graphql/user.resolvers";
import { DatasourceManager } from "../config/DatasourceManager.service";
import models from "./index.model";

const { logger } = DatasourceManager.getInstance();
const { userModel, diaryModel, diaryNotesModel } = models;

const userResolvers = new UserResolver(
    userModel,
    diaryModel,
    logger
).getResolvers();

const diaryResolvers = new DiaryResolver(
    diaryModel,
    diaryNotesModel,
    logger
).getResolvers();
const diaryNoteResolvers = new DiaryNotesResolver(
    diaryNotesModel
).getResolvers();

export const resolvers = [userResolvers, diaryResolvers, diaryNoteResolvers];
