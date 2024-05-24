import {
    MutationCreateUserArgs,
    MutationUpdateUserArgs,
    User,
} from "../../__generated__/types";
import { MockDataSource } from "../../__mocks__/MockDataSource";
import { MockRepository } from "../../__mocks__/MockRepository";
import { UserModel } from "./User.model";
import { UsersSchemaModel } from "./User.schema";
import { DateTime } from "luxon";

describe("UserModel", () => {
    let userModel: UserModel;
    let mockDataSource: MockDataSource;
    let mockRepository: MockRepository;
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
        mockDataSource = new MockDataSource();
        mockRepository = new MockRepository(mockDataSource);
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
        mockRepository.readById.mockResolvedValue(expectedUser);

        const result = await userModel.readById("123example");

        expect(mockRepository.readById).toHaveBeenCalledWith("123example");
        expect(result).toEqual(expectedUser);
    });

    it("should return null if no user is found by id", async () => {
        mockRepository.readById.mockResolvedValue(null);

        const result = await userModel.readById("404");

        expect(result).toBeNull();
    });

    it("should retrieve users by a specific field", async () => {
        const users = [{ id: "123example", name: "John Doe" }];
        mockRepository.readByField.mockResolvedValue(users);

        const result = await userModel.readByField({
            field: "name",
            stringValue: "John Doe",
        });

        expect(mockRepository.readByField).toHaveBeenCalledWith({
            field: "name",
            stringValue: "John Doe",
        });
        expect(result).toEqual(users);
    });

    it("should retrieve multiple users and return data with count", async () => {
        const users = [
            { id: "123", name: "John Doe" },
            { id: "124", name: "Jane Doe" },
        ];
        const expectedData = { data: users, count: 2 };
        mockRepository.read.mockResolvedValue(expectedData);

        const result = await userModel.readMany(2, 0);

        expect(mockRepository.read).toHaveBeenCalledWith({
            take: 2,
            skip: 0,
        });
        expect(result).toEqual(expectedData);
    });
});
