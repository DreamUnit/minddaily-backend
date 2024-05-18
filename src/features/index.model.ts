import { DatasourceManager } from "../config/DatasourceManager.service";
import { DiaryNotesModel } from "./diary-notes/DiaryNotes.model";
import { DiaryModel } from "./diary/Diary.model";
import { UserModel } from "./user/User.model";

const { dataSource } = DatasourceManager.getInstance();

const userModel = new UserModel(dataSource);
const diaryModel = new DiaryModel(dataSource);
const diaryNotesModel = new DiaryNotesModel(dataSource);

const models = Object.freeze({
    userModel,
    diaryModel,
    diaryNotesModel,
});

export default models;
