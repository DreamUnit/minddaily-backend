import models from "../features/index.model";
import { seedScript } from "./seed.util";

const { userModel, diaryModel, diaryNotesModel } = models;

jest.mock("../features/index.model", () => {
    return {
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
    };
});

jest.mock("../config/DatasourceManager.service", () => {
    return {
        DatasourceManager: {
            dataSource: {
                connect: jest.fn().mockResolvedValue(true),
                close: jest.fn().mockResolvedValue(true),
            },
            logger: {
                info: jest.fn(),
                warning: jest.fn(),
                error: jest.fn(),
            },
            getInstance: jest.fn(() => ({
                dataSource: {
                    connect: jest.fn().mockResolvedValue(true),
                    close: jest.fn().mockResolvedValue(true),
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
    afterEach(() => {
        jest.clearAllMocks();
    });
    it("sub functions and methods should be called correctly", async () => {
        await seedScript;
        expect(userModel.create).toHaveBeenCalledTimes(100);
        expect(diaryModel.create).toHaveBeenCalledTimes(100);
        expect(diaryNotesModel.create).toHaveBeenCalledTimes(100);
    });
});
