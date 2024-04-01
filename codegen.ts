import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";
import path from "path";

dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "./production.env"
            : "./development.env"
    ),
});
const config: CodegenConfig = {
    overwrite: true,
    debug: process.env.NODE_ENV === "development",
    schema: process.env.SCHEMA_PORT,
    generates: {
        "src/__generated__/types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                contextType: "./src/context#DataSourceContext",
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
