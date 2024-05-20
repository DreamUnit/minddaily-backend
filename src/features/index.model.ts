import { DatasourceManager } from "../config/DatasourceManager.service";
import { DiaryNotesModel } from "./diary-notes/DiaryNotes.model";
import { DiaryModel } from "./diary/Diary.model";
import repositories from "./index.repository";
import { UserModel } from "./user/User.model";

const { userRepository, diaryRepository, diaryNoteRepository } = repositories;

const userModel = new UserModel(userRepository);
const diaryModel = new DiaryModel(diaryRepository);
const diaryNotesModel = new DiaryNotesModel(diaryNoteRepository);

const models = Object.freeze({
    userModel,
    diaryModel,
    diaryNotesModel,
});

export default models;
