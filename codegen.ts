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
    schema: "./src/features/*/graphql/*.schemas.ts",
    generates: {
        "src/__generated__/types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
        },
    },
};

export default config;
