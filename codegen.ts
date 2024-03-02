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
                mappers: {},
            },
        },
    },
};

export default config;
