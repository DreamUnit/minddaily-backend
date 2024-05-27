import { AbstractModel } from "../common/AbstractModel.model";
import {
    Diary,
    DiaryFilterOpts,
    MutationCreateDiaryArgs,
    MutationUpdateDiaryArgs,
} from "../../__generated__/types";
import { IRepository } from "../common/common.types";

export class DiaryModel extends AbstractModel<
    MutationCreateDiaryArgs,
    MutationUpdateDiaryArgs,
    Diary
> {
    constructor(
        diaryRepository: IRepository<
            Partial<Diary>,
            Partial<Diary>,
            DiaryFilterOpts,
            Diary
        >
    ) {
        super(diaryRepository);
    }
}
