import dotenv from "dotenv";
import path from "path";
import { MongodbDataSource } from "../dataSources/MongodbDataSource.datasource";
import { UserModel } from "../features/user/User.model";
import { DiaryNotesModel } from "../features/diary-notes/DiaryNotes.model";
import { ILogger } from "../utils/Logger.types";
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
// Logger instantiation
export const logger: ILogger = new Logger(new WinstonLogger());

// DataSource instantiation
export const dataSource = new MongodbDataSource(
    process.env.MONGODB_DSN,
    logger
);

// Model instantiations
export const authController = new AuthController();
export const userModel = new UserModel(dataSource);
export const diaryModel = new DiaryModel(dataSource);
export const diaryNotesModel = new DiaryNotesModel(dataSource);