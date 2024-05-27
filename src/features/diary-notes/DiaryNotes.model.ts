import { AbstractModel } from "../common/AbstractModel.model";
import {
    DiaryNote,
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
} from "../../__generated__/types";
import { DiaryNoteRepository } from "./DiaryNote.repository";

export class DiaryNotesModel extends AbstractModel<
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
    DiaryNote
> {
    constructor(diaryNoteRepository: DiaryNoteRepository) {
        super(diaryNoteRepository);
    }
}
