import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
    overwrite: true,
    schema: process.env.SCHEMA_PORT,
    generates: {
        "src/__generated__/types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                contextType: "../context#DataSourceContext",
                mappers: {
                    User: "../graphql/mappers/User#IUser",
                    Diary: "../graphql/mappers/Diary#IDiary",
                    DiaryNote: "../graphql/mappers/DiaryNotes#IDiaryNote",
                },
            },
        },
    },
};

export default config;
