import {
    Diary,
    MutationCreateDiaryArgs,
    MutationUpdateDiaryArgs,
} from "../../__generated__/types";
import { MockDataSource } from "../../__mocks__/MockDataSource";
import { DiaryModel } from "./Diary.model";
import { DateTime } from "luxon";
import { MockRepository } from "../../__mocks__/MockRepository";

describe("DiaryModel", () => {
    let diaryModel: DiaryModel;
    let mockDataSource: MockDataSource;
    let mockRepository: MockRepository;
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
        mockRepository = new MockRepository(mockDataSource);
        diaryModel = new DiaryModel(mockRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a diary and return diary data", async () => {
        const diaryData: MutationCreateDiaryArgs = {
            title: "title",
            userId: "userId",
        };

        mockRepository.create.mockResolvedValue(expectedDiary);

        const result = await diaryModel.create(diaryData);

        expect(mockRepository.create).toHaveBeenCalledWith(
            expect.objectContaining(diaryData)
        );

        expect(result).toEqual(expectedDiary);
    });

    it("should update a diary  and return updated data", async () => {
        const mockUpdateData: MutationUpdateDiaryArgs = {
            id: "exampleId",
            title: "title",
            userId: "userId",
        };

        mockRepository.update.mockResolvedValue(updatedDiary);

        const result = await diaryModel.update("exampleId", mockUpdateData);

        expect(mockRepository.update).toHaveBeenCalledWith(
            "exampleId",
            mockUpdateData
        );
        expect(result).toEqual(updatedDiary);
    });

    it("should delete a diary  by id and return true", async () => {
        mockRepository.deleteById.mockResolvedValue(true);

        const result = await diaryModel.delete("exampleId");

        expect(mockRepository.deleteById).toHaveBeenCalledWith("exampleId");
        expect(result).toBe(true);
    });

    it("should retrieve a diary  by id if diary  exists", async () => {
        mockRepository.readById.mockResolvedValue(expectedDiary);

        const result = await diaryModel.readById("exampleId");

        expect(mockRepository.readById).toHaveBeenCalledWith("exampleId");
        expect(result).toEqual(expectedDiary);
    });

    it("should return null if no diary is found by id", async () => {
        mockRepository.readById.mockResolvedValue(null);

        const result = await diaryModel.readById("404");

        expect(result).toBeNull();
    });

    it("should retrieve diary by a specific field", async () => {
        const expectedDiarys = [expectedDiary];
        mockRepository.readByField.mockResolvedValue(expectedDiarys);

        const result = await diaryModel.readByField({
            field: "title",
            stringValue: "example title",
        });

        expect(mockRepository.readByField).toHaveBeenCalledWith({
            field: "title",
            stringValue: "example title",
        });
        expect(result).toEqual(expectedDiarys);
    });

    it("should retrieve multiple diary and return data with count", async () => {
        const expectedDiarys = [
            { id: "exampleId1", title: "example 1" },
            { id: "exampleId2", title: "example 2" },
        ];
        const expectedData = { data: expectedDiarys, count: 2 };
        mockRepository.read.mockResolvedValue(expectedData);

        const result = await diaryModel.readMany(2, 0);

        expect(mockRepository.read).toHaveBeenCalledWith({
            take: 2,
            skip: 0,
        });
        expect(result).toEqual(expectedData);
    });
});
