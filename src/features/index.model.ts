import { DiaryNotesModel } from "./diary-notes/DiaryNotes.model";
import { DiaryModel } from "./diary/Diary.model";
import repositories from "./index.repository";
import { UserModel } from "./user/User.model";

const { userRepository, diaryRepository, diaryNoteRepository } = repositories;

export const userModel = new UserModel(userRepository);
export const diaryModel = new DiaryModel(diaryRepository);
export const diaryNotesModel = new DiaryNotesModel(diaryNoteRepository);

const models = Object.freeze({
    userModel,
    diaryModel,
    diaryNotesModel,
});

export default models;
