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
import express from "express";

dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "../../production.env"
            : "../../development.env"
    ),
});

export class DataManager {
    static instance = null;
    logger: Logger;
    dataSource: MongodbDataSource;
    userModel: UserModel;
    diaryModel: DiaryModel;
    diaryNotesModel: DiaryNotesModel;
    authController: AuthController;

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
