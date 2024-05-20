import { DatasourceManager } from "../config/DatasourceManager.service";
import { DiaryNoteRepository } from "./diary-notes/DiaryNote.repository";
import { DiaryRepository } from "./diary/Diary.repository";
import { UserRepository } from "./user/User.repository";

const { dataSource } = DatasourceManager.getInstance();

const userRepository = new UserRepository(dataSource);
const diaryRepository = new DiaryRepository(dataSource);
const diaryNoteRepository = new DiaryNoteRepository(dataSource);

const repositories = Object.freeze({
    userRepository,
    diaryRepository,
    diaryNoteRepository,
});

export default repositories;
