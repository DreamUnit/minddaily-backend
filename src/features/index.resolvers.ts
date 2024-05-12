import { diaryResolvers } from "./diary/graphql/diary.resolvers";
import { diaryNotesResolvers } from "./diary-notes/graphql/diaryNotes.resolvers";
import { userResolvers } from "./user/graphql/user.resolvers";
import { commonTypeDefs } from "./common/common.schema";

export const resolvers = [
    // commonTypeDefs,
    userResolvers,
    diaryResolvers,
    diaryNotesResolvers,
];
