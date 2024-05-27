import { AbstractModel } from "../common/AbstractModel.model";
import {
    DiaryNote,
    DiaryNoteFilterOpts,
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
} from "../../__generated__/types";
import { IRepository } from "../common/common.types";

export class DiaryNotesModel extends AbstractModel<
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
    DiaryNote
> {
    constructor(
        diaryRepository: IRepository<
            Partial<DiaryNote>,
            Partial<DiaryNote>,
            DiaryNoteFilterOpts,
            DiaryNote
        >
    ) {
        super(diaryRepository);
    }
}
