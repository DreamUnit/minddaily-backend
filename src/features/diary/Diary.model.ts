import { AbstractModel } from "../common/AbstractModel.model";
import {
    Diary,
    MutationCreateDiaryArgs,
    MutationUpdateDiaryArgs,
} from "../../__generated__/types";
import { DiaryRepository } from "./Diary.repository";

export class DiaryModel extends AbstractModel<
    MutationCreateDiaryArgs,
    MutationUpdateDiaryArgs,
    Diary
> {
    constructor(diaryRepository: DiaryRepository) {
        super(diaryRepository);
    }
}
