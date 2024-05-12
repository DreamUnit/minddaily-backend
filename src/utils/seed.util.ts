import {
    userModel,
    diaryModel,
    diaryNotesModel,
    dataSource,
    logger,
} from "../config/dataServices.service";

const firstNames = [
    "John",
    "Jane",
    "Vlad",
    "David",
    "Mohammad",
    "Jane",
    "Saki",
];
const foreNames = [
    "Smith",
    "Johnson",
    "Fujimoto",
    "Pedro",
    "Hammad",
    "Lawrence",
    "Watanabe",
];
const diaryTitles = [
    "Dreams and Wonders",
    "Daily Discoveries",
    "Thoughts Unbound",
    "Life’s Journey",
    "Mysteries Unveiled",
    "Pathways of the Mind",
    "Silent Whispers",
];
const diaryNoteTitles = [
    "Morning Reflections",
    "Unexpected Journey",
    "Quiet Moments",
    "Cherished Memories",
    "Lessons Learned",
    "Brighter Tomorrows",
    "Echoes of the Past",
];
const diaryNoteTexts = [
    "The early morning sun casts a golden hue over everything, bringing warmth and light to my thoughts.",
    "Today, I embarked on an adventure I never expected. It was a day of surprises and newfound joys.",
    "In the silence, I found myself pondering over the day's events, appreciating the calm.",
    "I revisited the memories that hold a special place in my heart, feeling grateful for the love and joy they bring.",
    "Each mistake has taught me valuable lessons, shaping me into who I am today.",
    "Looking ahead, I see a future filled with promise and hope, ready for the bright days to come.",
    "Listening to the echoes of the past, I understand how they have guided me to my present.",
];

export async function seedMongoDb() {
    await dataSource.connect();

    logger.info("begin seeding db...");
    try {
        let random;
        let randomV2;
        for (let i = 0; i < 100; i++) {
            random = Math.floor(Math.random() * 7);
            randomV2 = Math.floor(Math.random() * 7);

            const user = await userModel.create({
                authUserId: `abcdef${i}`,
                name: `${firstNames[random]} ${foreNames[randomV2]}`,
                email: `${firstNames[random]} ${foreNames[randomV2]}${i}@hotmail.com`,
                locale: `EU`,
            });

            const diary = await diaryModel.create({
                userId: user.id,
                title: diaryTitles[random],
            });

            await diaryNotesModel.create({
                title: diaryNoteTitles[random],
                text: diaryNoteTexts[random],
                diaryId: diary.id,
            });
        }

        await dataSource.close();
    } catch (err) {
        return logger.error(`failed to seed db with an error of ${err}`);
    }
    logger.info("completed seeding db");
}

export const seedScript = seedMongoDb();
