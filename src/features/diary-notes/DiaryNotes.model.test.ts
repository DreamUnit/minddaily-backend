import {
    DiaryNote,
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
} from "../../__generated__/types";
import { MockDataSource } from "../../__mocks__/MockDataSource";
import { DiaryNoteSchemaModel } from "./DiaryNote.schema";
import { DiaryNotesModel } from "./DiaryNotes.model";
import { DateTime } from "luxon";

describe("DiaryNotesModel", () => {
    let diaryNotesModel: DiaryNotesModel;
    let mockDataSource: MockDataSource;
    const mockDate = DateTime.now().toISO();
    const mockUpdatedData = DateTime.now().toISO();
    const expectedDiaryNote: DiaryNote = {
        text: "example text",
        title: "example title",
        diaryId: "exampleDiaryId",
        createdDate: mockDate,
        updatedDate: mockDate,
        id: "exampleId",
        images: [],
        version: 1,
    };

    const updatedDiaryNote: DiaryNote = {
        text: "new text",
        title: "new title",
        diaryId: "exampleDiaryId",
        createdDate: mockDate,
        updatedDate: mockUpdatedData,
        id: "exampleId",
        images: [],
        version: 1,
    };
    beforeEach(() => {
        mockDataSource = new MockDataSource();
        diaryNotesModel = new DiaryNotesModel(mockDataSource);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a diary Note and return diary Note data", async () => {
        const diaryNoteData: MutationCreateDiaryNoteArgs = {
            diaryId: "exampleDiaryId",
            text: "example text",
            title: "example title",
        };

        mockDataSource.write.mockResolvedValue(expectedDiaryNote);

        const result = await diaryNotesModel.create(diaryNoteData);

        expect(mockDataSource.write).toHaveBeenCalledWith(
            "diary_notes",
            DiaryNoteSchemaModel,
            { data: expect.objectContaining(diaryNoteData) }
        );

        expect(result).toEqual(expectedDiaryNote);
    });

    it("should update a diary note and return updated data", async () => {
        const mockUpdateData: MutationUpdateDiaryNoteArgs = {
            id: "exampleId",
            text: "new text",
            title: "new title",
        };

        mockDataSource.update.mockResolvedValue(updatedDiaryNote);

        const result = await diaryNotesModel.update(
            "exampleId",
            mockUpdateData
        );

        expect(mockDataSource.update).toHaveBeenCalledWith("diary_notes", {
            id: "exampleId",
            data: mockUpdateData,
        });
        expect(result).toEqual(updatedDiaryNote);
    });

    it("should delete a diary note by id and return true", async () => {
        mockDataSource.deleteById.mockResolvedValue(true);

        const result = await diaryNotesModel.delete("exampleId");

        expect(mockDataSource.deleteById).toHaveBeenCalledWith(
            "diary_notes",
            DiaryNoteSchemaModel,
            { id: "exampleId" }
        );
        expect(result).toBe(true);
    });

    it("should retrieve a diary note by id if diary note exists", async () => {
        mockDataSource.readById.mockResolvedValue(expectedDiaryNote);

        const result = await diaryNotesModel.readById("exampleId");

        expect(mockDataSource.readById).toHaveBeenCalledWith(
            "diary_notes",
            "exampleId"
        );
        expect(result).toEqual(expectedDiaryNote);
    });

    it("should return null if no diary note is found by id", async () => {
        mockDataSource.readById.mockResolvedValue(null);

        const result = await diaryNotesModel.readById("404");

        expect(result).toBeNull();
    });

    it("should retrieve diary notes by a specific field", async () => {
        const expectedDiaryNotes = [expectedDiaryNote];
        mockDataSource.readByField.mockResolvedValue(expectedDiaryNotes);

        const result = await diaryNotesModel.readByField({
            field: "title",
            stringValue: "example title",
        });

        expect(mockDataSource.readByField).toHaveBeenCalledWith(
            "diary_notes",
            "title",
            "example title"
        );
        expect(result).toEqual(expectedDiaryNotes);
    });

    it("should retrieve multiple diary notes and return data with count", async () => {
        const expectedDiaryNotes = [
            { id: "exampleId1", title: "example 1" },
            { id: "exampleId2", title: "example 2" },
        ];
        const expectedData = { data: expectedDiaryNotes, count: 2 };
        mockDataSource.read.mockResolvedValue(expectedData);

        const result = await diaryNotesModel.readMany(2, 0);

        expect(mockDataSource.read).toHaveBeenCalledWith("diary_notes", {
            take: 2,
            skip: 0,
        });
        expect(result).toEqual(expectedData);
    });
});
