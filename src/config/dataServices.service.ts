import dotenv from "dotenv";
import path from "path";
import { MongodbDataSource } from "../dataSources/MongodbDataSource.datasource";
import { UserModel } from "../features/user/User.model";
import { DiaryNotesModel } from "../features/diary-notes/DiaryNotes.model";
import { WinstonLogger } from "../utils/WinstonLogger.util";
import { Logger } from "../utils/Logger.util";
import AuthController from "../controllers/Auth.controller";
import { DiaryModel } from "../features/index.model";

dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "../../production.env"
            : "../../development.env"
    ),
});
/**
 *  We are using the singleton pattern here to instantiate our data classes when we need them
 * if there is already an instance we retrieve the already running instance of our data
 * class thus encapsulating our data class instantiation and not instantiating them in
 * global scope
 */
export class DataManager {
    static instance: DataManager | null = null;
    public logger: Logger;
    public dataSource: MongodbDataSource;
    public userModel: UserModel;
    public diaryModel: DiaryModel;
    public diaryNotesModel: DiaryNotesModel;
    public authController: AuthController;

    constructor() {
        if (DataManager.instance) {
            return DataManager.instance;
        }
        this.initDataClasses();
        DataManager.instance = this;
    }

    initDataClasses() {
        // Logger instantiation
        this.logger = new Logger(new WinstonLogger());

        // DataSource instantiation
        this.dataSource = new MongodbDataSource(
            process.env.MONGODB_DSN,
            this.logger
        );

        // Model instantiations
        this.userModel = new UserModel(this.dataSource);
        this.diaryModel = new DiaryModel(this.dataSource);
        this.diaryNotesModel = new DiaryNotesModel(this.dataSource);

        // Controller instantiation
        this.authController = new AuthController(this.logger);
    }

    static getInstance() {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }
        return DataManager.instance;
    }
}
