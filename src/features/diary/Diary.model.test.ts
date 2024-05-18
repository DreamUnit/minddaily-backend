import {
    Diary,
    MutationCreateDiaryArgs,
    MutationUpdateDiaryArgs,
} from "../../__generated__/types";
import { MockDataSource } from "../../__mocks__/MockDataSource";
import { DiarySchemaModel } from "./Diary.schema";
import { DiaryModel } from "./Diary.model";
import { DateTime } from "luxon";

describe("DiaryModel", () => {
    let diaryModel: DiaryModel;
    let mockDataSource: MockDataSource;
    const mockDate = DateTime.now().toISO();
    const mockUpdatedData = DateTime.now().toISO();
    const expectedDiary: Diary = {
        createdDate: mockDate,
        id: "exampleId",
        notes: [],
        title: "title",
        userId: "userId",
        version: 1,
    };

    const updatedDiary: Diary = {
        createdDate: mockDate,
        updatedDate: mockUpdatedData,
        id: "exampleId",
        notes: [],
        title: "title",
        userId: "userId",
        version: 2,
    };
    beforeEach(() => {
        mockDataSource = new MockDataSource();
        diaryModel = new DiaryModel(mockDataSource);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a diary and return diary data", async () => {
        const diaryData: MutationCreateDiaryArgs = {
            title: "title",
            userId: "userId",
        };

        mockDataSource.write.mockResolvedValue(expectedDiary);

        const result = await diaryModel.create(diaryData);

        expect(mockDataSource.write).toHaveBeenCalledWith(
            "diaries",
            DiarySchemaModel,
            { data: expect.objectContaining(diaryData) }
        );

        expect(result).toEqual(expectedDiary);
    });

    it("should update a diary  and return updated data", async () => {
        const mockUpdateData: MutationUpdateDiaryArgs = {
            id: "exampleId",
            title: "title",
            userId: "userId",
        };

        mockDataSource.update.mockResolvedValue(updatedDiary);

        const result = await diaryModel.update("exampleId", mockUpdateData);

        expect(mockDataSource.update).toHaveBeenCalledWith("diaries", {
            id: "exampleId",
            data: mockUpdateData,
        });
        expect(result).toEqual(updatedDiary);
    });

    it("should delete a diary  by id and return true", async () => {
        mockDataSource.deleteById.mockResolvedValue(true);

        const result = await diaryModel.delete("exampleId");

        expect(mockDataSource.deleteById).toHaveBeenCalledWith(
            "diaries",
            DiarySchemaModel,
            { id: "exampleId" }
        );
        expect(result).toBe(true);
    });

    it("should retrieve a diary  by id if diary  exists", async () => {
        mockDataSource.readById.mockResolvedValue(expectedDiary);

        const result = await diaryModel.readById("exampleId");

        expect(mockDataSource.readById).toHaveBeenCalledWith(
            "diaries",
            "exampleId"
        );
        expect(result).toEqual(expectedDiary);
    });

    it("should return null if no diary is found by id", async () => {
        mockDataSource.readById.mockResolvedValue(null);

        const result = await diaryModel.readById("404");

        expect(result).toBeNull();
    });

    it("should retrieve diary by a specific field", async () => {
        const expectedDiarys = [expectedDiary];
        mockDataSource.readByField.mockResolvedValue(expectedDiarys);

        const result = await diaryModel.readByField({
            field: "title",
            stringValue: "example title",
        });

        expect(mockDataSource.readByField).toHaveBeenCalledWith(
            "diaries",
            "title",
            "example title"
        );
        expect(result).toEqual(expectedDiarys);
    });

    it("should retrieve multiple diary and return data with count", async () => {
        const expectedDiarys = [
            { id: "exampleId1", title: "example 1" },
            { id: "exampleId2", title: "example 2" },
        ];
        const expectedData = { data: expectedDiarys, count: 2 };
        mockDataSource.read.mockResolvedValue(expectedData);

        const result = await diaryModel.readMany(2, 0);

        expect(mockDataSource.read).toHaveBeenCalledWith("diaries", {
            take: 2,
            skip: 0,
        });
        expect(result).toEqual(expectedData);
    });
});
