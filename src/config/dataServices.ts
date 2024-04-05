import dotenv from "dotenv";
import path from "path";
import { MongodbDataSource } from "../dataSources/MongodbDataSource";
import { UserModel } from "../models/User";
import { DiaryModel } from "../models/Diary";
import { DiaryNotesModel } from "../models/DiaryNotes";
import { ILogger } from "../utils/types/Logger";
import { WinstonLogger } from "../utils/logging/WinstonLogger";
import { Logger } from "../utils/logging/Logger";

dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "../../production.env"
            : "../../development.env"
    ),
});
console.log(process.env.MONGODB_DSN);
// Logger instantiation
export const logger: ILogger = new Logger(new WinstonLogger());

// DataSource instantiation
export const dataSource = new MongodbDataSource(
    process.env.MONGODB_DSN,
    logger
);

// Model instantiations
export const userModel = new UserModel(dataSource);
export const diaryModel = new DiaryModel(dataSource);
export const diaryNotesModel = new DiaryNotesModel(dataSource);
