import { DataManager } from "../config/dataServices.service";
import { seedScript } from "./seed.util";
import { DateTime } from "luxon";

const { dataSource, diaryModel, diaryNotesModel, logger, userModel } =
    DataManager.getInstance();

jest.mock("../config/dataServices.service", () => {
    return {
        dataSource: {
            connect: jest.fn().mockResolvedValue(true),
            close: jest.fn().mockResolvedValue(true),
        },

        userModel: {
            create: jest
                .fn()
                .mockImplementation(userData =>
                    Promise.resolve({ id: "user123", ...userData })
                ),
        },
        diaryModel: {
            create: jest
                .fn()
                .mockImplementation(diaryData =>
                    Promise.resolve({ id: "diary123", ...diaryData })
                ),
        },
        diaryNotesModel: {
            create: jest
                .fn()
                .mockImplementation(diaryNoteData =>
                    Promise.resolve({ id: "diaryNote123", ...diaryNoteData })
                ),
        },
        logger: {
            info: jest.fn(),
        },
    };
});

describe("SeedMongoDb script", () => {
    it("sub functions and methods should be called correctly", async () => {
        await seedScript;
        expect(logger.info).toHaveBeenCalledTimes(2);

        expect(dataSource.connect).toHaveBeenCalledTimes(1);
        expect(dataSource.close).toHaveBeenCalledTimes(1);

        expect(userModel.create).toHaveBeenCalledTimes(100);
        expect(diaryModel.create).toHaveBeenCalledTimes(100);
        expect(diaryNotesModel.create).toHaveBeenCalledTimes(100);
    });

    it("should seed the database with the correct data", async () => {
        const testDate = DateTime.utc();
        const user = await userModel.create({
            authUserId: `abcdef`,
            name: `Jane Doe`,
            email: `janedoe1@hotmail.com`,
            locale: "en-GB",
        });
        expect(user).toHaveProperty("authUserId", "abcdef");
        expect(user).toHaveProperty("name", "Jane Doe");
        expect(user).toHaveProperty("email", "janedoe1@hotmail.com");
        expect(user).toHaveProperty("locale", "EU");

        const diary = await diaryModel.create({
            userId: "exampleuserid123",
            title: "a test title",
        });
        expect(diary).toHaveProperty("createdDate", testDate);
        expect(diary).toHaveProperty("version", 1);
        expect(diary).toHaveProperty("userId", "exampleuserid123");
        expect(diary).toHaveProperty("title", "a test title");

        const diaryNote = await diaryNotesModel.create({
            title: "a note title",
            text: "a note text",
            diaryId: "exampleId1222",
        });
        expect(diaryNote).toHaveProperty("createdDate", testDate);
        expect(diaryNote).toHaveProperty("version", 1);
        expect(diaryNote).toHaveProperty("title", "a note title");
        expect(diaryNote).toHaveProperty("text", "a note text");
        expect(diaryNote).toHaveProperty("diaryId", "exampleId1222");
    });
});

afterAll(async () => {
    await dataSource.close();
});
