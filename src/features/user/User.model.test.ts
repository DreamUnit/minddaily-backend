import {
    MutationCreateUserArgs,
    MutationUpdateUserArgs,
    User,
} from "../../__generated__/types";
import { UserModel } from "./User.model";
import { UserRepository } from "./User.repository";
import { DateTime } from "luxon";

describe("UserModel", () => {
    let userModel: UserModel;
    let mockRepository: jest.Mocked<UserRepository>;
    const mockDate = DateTime.now().toISO();
    const mockUpdatedDate = DateTime.now().toISO();
    const expectedData: User = {
        authUserId: "authUserId123",
        name: "John Doe",
        email: "john@example.com",
        locale: "en-US",
        createdDate: mockDate,
        updatedDate: mockDate,
        id: "123example",
        permissions: [],
        version: 1,
        active: true,
        points: 0,
    };
    const updatedUser: User = {
        authUserId: "authUserId123",
        name: "Updated Name",
        email: "john@example.com",
        locale: "en-US",
        createdDate: mockDate,
        updatedDate: mockUpdatedDate,
        id: "123example",
        permissions: [],
        version: 2,
        active: true,
        points: 0,
    };

    beforeEach(() => {
        mockRepository = {
            create: jest.fn().mockResolvedValue(expectedData),
            update: jest.fn().mockResolvedValue(updatedUser),
            deleteById: jest.fn().mockResolvedValue(true),
            readById: jest.fn().mockResolvedValue(expectedData),
            readByField: jest.fn().mockResolvedValue([expectedData]),
            read: jest
                .fn()
                .mockResolvedValue({ data: [expectedData], count: 1 }),
        } as any;
        userModel = new UserModel(mockRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create a user and return user data", async () => {
        const userData: MutationCreateUserArgs = {
            authUserId: "authUserId123",
            name: "John Doe",
            email: "john@example.com",
            locale: "en-US",
        };

        mockRepository.create.mockResolvedValue(expectedData);

        const result = await userModel.create(userData);

        expect(mockRepository.create).toHaveBeenCalledWith(
            expect.objectContaining(userData)
        );

        expect(result).toEqual(expectedData);
    });

    it("should update a user and return updated data", async () => {
        const mockUpdateData: MutationUpdateUserArgs = {
            id: "123",
            name: "Updated Name",
        };

        mockRepository.update.mockResolvedValue(updatedUser);

        const result = await userModel.update("123example", mockUpdateData);
        expect(mockRepository.update).toHaveBeenCalledWith(
            "123example",
            mockUpdateData
        );
        expect(result).toEqual(updatedUser);
    });

    it("should delete a user by id and return true", async () => {
        mockRepository.deleteById.mockResolvedValue(true);

        const result = await userModel.delete("123example");

        expect(mockRepository.deleteById).toHaveBeenCalledWith("123example");
        expect(result).toBe(true);
    });

    it("should retrieve a user by id if user exists", async () => {
        const expectedUser = { id: "123example", name: "John Doe" };
        mockRepository.readById.mockResolvedValue(expectedData);

        const result = await userModel.readById("123example");

        expect(mockRepository.readById).toHaveBeenCalledWith("123example");
        expect(result).toEqual(expectedData);
    });

    it("should return null if no user is found by id", async () => {
        mockRepository.readById.mockResolvedValue(null);

        const result = await userModel.readById("404");

        expect(result).toBeNull();
    });

    it("should retrieve users by a specific field", async () => {
        const expectedUsers = [expectedData];
        mockRepository.readByField.mockResolvedValue(expectedUsers);

        const result = await userModel.readByField({
            field: "name",
            stringValue: "John Doe",
        });

        expect(mockRepository.readByField).toHaveBeenCalledWith({
            name: "John Doe",
        });
        expect(result).toEqual(expectedUsers);
    });

    it("should retrieve multiple users and return data with count", async () => {
        const expectedUser = { data: [expectedData], count: 1 };
        mockRepository.read.mockResolvedValue(expectedUser);

        const result = await userModel.readMany(2, 0);

        expect(mockRepository.read).toHaveBeenCalledWith({
            take: 2,
            skip: 0,
        });
        expect(result).toEqual(expectedUser);
    });
});
