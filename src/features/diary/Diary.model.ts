import { IReadManyAndCountResult } from "../../dataSources/DataSource.types";
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
    private readonly repository: IRepository<
        Partial<Diary>,
        Partial<Diary>,
        DiaryFilterOpts,
        Diary
    >;
    constructor(
        diaryRepository: IRepository<
            Partial<Diary>,
            Partial<Diary>,
            DiaryFilterOpts,
            Diary
        >
    ) {
        super();
        this.repository = diaryRepository;
    }

    public async create(inputData: MutationCreateDiaryArgs): Promise<Diary> {
        const data = await this.repository.create({
            version: 1,
            ...inputData,
        });

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async update(
        id: string,
        updatedData: MutationUpdateDiaryArgs
    ): Promise<Diary> {
        const updatedDataResponse = await this.repository.update(
            id,
            updatedData
        );
        return updatedDataResponse;
    }

    async delete(id: string): Promise<boolean> {
        const deleteResponse = await this.repository.deleteById(id);
        return deleteResponse;
    }

    async readById(id: string): Promise<Diary | null> {
        const data = await this.repository.readById(id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async readByField(opts: DiaryFilterOpts): Promise<Diary[] | null> {
        const { field, intValue, stringValue } = opts;
        let queryResult = await this.repository.readByField({
            field,
            intValue,
            stringValue,
        });
        return Array.isArray(queryResult) ? queryResult : [queryResult];
    }

    async readMany(
        take: number,
        skip: number
    ): Promise<IReadManyAndCountResult<Diary>> {
        const data = await this.repository.read({
            take,
            skip,
        });
        return data;
    }
}
