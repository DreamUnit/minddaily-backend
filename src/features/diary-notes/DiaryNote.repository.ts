import { DiaryNote, DiaryNoteFilterOpts } from "../../__generated__/types";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import { DiaryNoteSchemaModel } from "./DiaryNote.schema";
import AbstractRespository from "../common/AbstractRepository.repository";

export class DiaryNoteRepository extends AbstractRespository<
    DiaryNote,
    DiaryNote,
    DiaryNoteFilterOpts,
    DiaryNote
> {
    constructor(dataSource: IDataSource) {
        super(dataSource, "diary_notes", DiaryNoteSchemaModel);
    }
}
