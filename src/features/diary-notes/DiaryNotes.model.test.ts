import {
    DiaryNote,
    MutationCreateDiaryNoteArgs,
    MutationUpdateDiaryNoteArgs,
} from "../../__generated__/types";
import { DiaryNoteRepository } from "./DiaryNote.repository";
import { DiaryNotesModel } from "./DiaryNotes.model";
import { DateTime } from "luxon";

describe("DiaryNotesModel", () => {
    let diaryNotesModel: DiaryNotesModel;
    let mockRepository: jest.Mocked<DiaryNoteRepository>;
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
        mockRepository = {
            create: jest.fn().mockResolvedValue(expectedDiaryNote),
            update: jest.fn().mockResolvedValue(updatedDiaryNote),
            deleteById: jest.fn().mockResolvedValue(true),
            readById: jest.fn().mockResolvedValue(expectedDiaryNote),
            readByField: jest.fn().mockResolvedValue([expectedDiaryNote]),
            read: jest
                .fn()
                .mockResolvedValue({ data: [expectedDiaryNote], count: 1 }),
        } as any;

        diaryNotesModel = new DiaryNotesModel(mockRepository);
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

        mockRepository.create.mockResolvedValue(expectedDiaryNote);

        const result = await diaryNotesModel.create(diaryNoteData);

        expect(mockRepository.create).toHaveBeenCalledWith(
            expect.objectContaining(diaryNoteData)
        );

        expect(result).toEqual(expectedDiaryNote);
    });

    it("should update a diary note and return updated data", async () => {
        const mockUpdateData: MutationUpdateDiaryNoteArgs = {
            id: "exampleId",
            text: "new text",
            title: "new title",
        };

        mockRepository.update.mockResolvedValue(updatedDiaryNote);

        const result = await diaryNotesModel.update(
            "exampleId",
            mockUpdateData
        );

        expect(mockRepository.update).toHaveBeenCalledWith(
            "exampleId",
            mockUpdateData
        );
        expect(result).toEqual(updatedDiaryNote);
    });

    it("should delete a diary note by id and return true", async () => {
        mockRepository.deleteById.mockResolvedValue(true);

        const result = await diaryNotesModel.delete("exampleId");

        expect(mockRepository.deleteById).toHaveBeenCalledWith("exampleId");
        expect(result).toBe(true);
    });

    it("should retrieve a diary note by id if diary note exists", async () => {
        mockRepository.readById.mockResolvedValue(expectedDiaryNote);

        const result = await diaryNotesModel.readById("exampleId");

        expect(mockRepository.readById).toHaveBeenCalledWith("exampleId");
        expect(result).toEqual(expectedDiaryNote);
    });

    it("should return null if no diary note is found by id", async () => {
        mockRepository.readById.mockResolvedValue(null);

        const result = await diaryNotesModel.readById("404");

        expect(result).toBeNull();
    });

    it("should retrieve diary notes by a specific field", async () => {
        const expectedDiaryNotes = [expectedDiaryNote];
        mockRepository.readByField.mockResolvedValue(expectedDiaryNotes);

        const result = await diaryNotesModel.readByField({
            field: "title",
            stringValue: "example title",
        });

        expect(mockRepository.readByField).toHaveBeenCalledWith({
            title: "example title",
        });
        expect(result).toEqual(expectedDiaryNotes);
    });

    it("should retrieve multiple diary notes and return data with count", async () => {
        const expectedData = { data: [expectedDiaryNote], count: 1 };
        mockRepository.read.mockResolvedValue(expectedData);
        1;
        const result = await diaryNotesModel.readMany(2, 0);

        expect(mockRepository.read).toHaveBeenCalledWith({
            take: 2,
            skip: 0,
        });
        expect(result).toEqual(expectedData);
    });
});
