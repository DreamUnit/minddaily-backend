import { userModel, diaryModel, diaryNotesModel } from "../index";
import {
    ICreateDiaryNoteRequest,
    ICreateDiaryRequest,
    ICreateUserRequest,
} from "../models/types";

export async function seedMongoDb() {
    console.log("begin seeding db...");
    for (let i = 0; i < 25; i++) {
        const user = await userModel.create<ICreateUserRequest>({
            authUserId: `abcdef${i}`,
            name: `example user${i}`,
            email: `example${i}@hotmail.com`,
            locale: `EU`,
        });

        const diary = await diaryModel.create<ICreateDiaryRequest>({
            userId: user.id,
            title: "example title",
        });

        await diaryNotesModel.create<ICreateDiaryNoteRequest>({
            title: `example diary note${i}`,
            text: `Example text${i}`,
            diaryId: diary.id,
        });
    }
    console.log("completed seeding db");
}

seedMongoDb();
