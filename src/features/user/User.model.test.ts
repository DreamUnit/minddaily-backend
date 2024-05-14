import {
    MutationCreateUserArgs,
    MutationUpdateUserArgs,
    User,
} from "../../__generated__/types";
import { MockDataSource } from "../../__mocks__/MockDataSource";
import { UserModel } from "./User.model";
import { UsersSchemaModel } from "./User.schema";
import { DateTime } from "luxon";

describe("UserModel", () => {
    let userModel: UserModel;
    let mockDataSource: MockDataSource;

    beforeEach(() => {
        mockDataSource = new MockDataSource();
        userModel = new UserModel(mockDataSource);
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

        const expectedData: User = {
            ...userData,
            createdDate: DateTime.now().toISO(),
            updatedDate: null,
            id: "123example",
            permissions: [],
            version: 1,
            active: true,
            points: 0,
        };

        mockDataSource.write.mockResolvedValue(expectedData);

        const result = await userModel.create(userData);

        expect(mockDataSource.write).toHaveBeenCalledWith(
            "users",
            UsersSchemaModel,
            { data: expect.objectContaining(userData) }
        );

        expect(result).toEqual(expectedData);
    });

    it("should update a user and return updated data", async () => {
        const mockUpdateData = {
            id: "123",
            name: "Updated Name",
        };
        const expectedUser: MutationUpdateUserArgs = {
            ...mockUpdateData,
        };
        mockDataSource.update.mockResolvedValue(expectedUser);

        const result = await userModel.update("123", mockUpdateData);

        expect(mockDataSource.update).toHaveBeenCalledWith("users", {
            id: "123",
            data: { ...mockUpdateData, updatedDate: DateTime.utc() },
        });
        expect(result).toEqual(expectedUser);
    });

    it("should delete a user by id and return true", async () => {
        mockDataSource.deleteById.mockResolvedValue(true);

        const result = await userModel.delete("123");

        expect(mockDataSource.deleteById).toHaveBeenCalledWith(
            "users",
            UsersSchemaModel,
            { id: "123" }
        );
        expect(result).toBe(true);
    });

    it("should retrieve a user by id if user exists", async () => {
        const expectedUser = { id: "123", name: "John Doe" };
        mockDataSource.readById.mockResolvedValue(expectedUser);

        const result = await userModel.readById("123");

        expect(mockDataSource.readById).toHaveBeenCalledWith("users", "123");
        expect(result).toEqual(expectedUser);
    });

    it("should return null if no user is found by id", async () => {
        mockDataSource.readById.mockResolvedValue(null);

        const result = await userModel.readById("404");

        expect(result).toBeNull();
    });

    it("should retrieve users by a specific field", async () => {
        const users = [{ id: "123", name: "John Doe" }];
        mockDataSource.readByField.mockResolvedValue(users);

        const result = await userModel.readByField({
            field: "name",
            stringValue: "John Doe",
        });

        expect(mockDataSource.readByField).toHaveBeenCalledWith(
            "users",
            "name",
            "John Doe"
        );
        expect(result).toEqual(users);
    });

    it("should retrieve multiple users and return data with count", async () => {
        const users = [
            { id: "123", name: "John Doe" },
            { id: "124", name: "Jane Doe" },
        ];
        const expectedData = { data: users, count: 2 };
        mockDataSource.read.mockResolvedValue(expectedData);

        const result = await userModel.readMany(2, 0);

        expect(mockDataSource.read).toHaveBeenCalledWith("users", {
            take: 2,
            skip: 0,
        });
        expect(result).toEqual(expectedData);
    });
});
