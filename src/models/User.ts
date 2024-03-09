import { IDataSource } from "../dataSources/DataSource";
import { IUser } from "../graphql/mappers/User";
import { IFilterOpts, IModel } from "./types/Common";

export class UserModel implements IModel<IUser> {
    private readonly source: string = "User";

    constructor(private dataSource: IDataSource) {}

    async fetchById(id: string): Promise<IUser | null> {
        const data = await this.dataSource.readById<IUser>(this.source, id);

        if (data !== null && Object.keys(data).length > 0) {
            return data;
        }
        return null;
    }

    async fetchByField(filter: IFilterOpts): Promise<IUser | null> {
        throw new Error("not implemented yet");
    }

    async fetchMany(take: number, skip: number): Promise<IUser[] | []> {
        // Implementation to fetch diaries with pagination using dataSource
        throw new Error("not implemented yet");
    }
}
