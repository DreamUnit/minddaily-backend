import { Diary, DiaryFilterOpts } from "../../__generated__/types";
import { IDataSource } from "../../dataSources/DataSource.datasource";
import { DiarySchemaModel } from "./Diary.schema";

import AbstractRespository from "../common/AbstractRepository.repository";

export class DiaryRepository extends AbstractRespository<
    Diary,
    Diary,
    DiaryFilterOpts,
    Diary
> {
    constructor(dataSource: IDataSource) {
        super(dataSource, "diaries", DiarySchemaModel);
    }
}
