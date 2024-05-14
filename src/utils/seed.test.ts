import { DataManager } from "../config/dataServices.service";
import { seedMongoDb, seedScript } from "./seed.util";
import { DateTime } from "luxon";

const { dataSource, diaryModel, diaryNotesModel, logger, userModel } =
    DataManager.getInstance();
// jest.mock("luxon", () => {
//     const actualLuxon = jest.requireActual("luxon");
//     return {
//         ...actualLuxon,
//         DateTime: {
//             ...actualLuxon.DateTime,
//             utc: jest.fn(() =>
//                 actualLuxon.DateTime.fromISO("2024-05-13T19:34:40.955Z")
//             ),
//         },
//     };
// });
const testDate = DateTime.utc();
jest.mock("../config/dataServices.service", () => {
    return {
        DataManager: {
            getInstance: jest.fn(() => ({
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
                    create: jest.fn().mockImplementation(diaryData =>
                        Promise.resolve({
                            id: "diary123",
                            ...diaryData,
                            createdDate: testDate,
                            version: 1,
                        })
                    ),
                },
                diaryNotesModel: {
                    create: jest.fn().mockImplementation(diaryNoteData =>
                        Promise.resolve({
                            id: "diaryNote123",
                            ...diaryNoteData,
                            createdDate: testDate,
                            version: 1,
                        })
                    ),
                },
                logger: {
                    info: jest.fn(),
                    warning: jest.fn(),
                    error: jest.fn(),
                },
            })),
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
        const user = await userModel.create({
            authUserId: `abcdef`,
            name: `Jane Doe`,
            email: `janedoe1@hotmail.com`,
            locale: "en-GB",
        });
        expect(user).toHaveProperty("authUserId", "abcdef");
        expect(user).toHaveProperty("name", "Jane Doe");
        expect(user).toHaveProperty("email", "janedoe1@hotmail.com");
        expect(user).toHaveProperty("locale", "en-GB");

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
