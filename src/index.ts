import dotenv from "dotenv";
import path from "path";
import { startServer } from "./server";

dotenv.config({
    path: path.resolve(
        __dirname,
        process.env.NODE_ENV === "production"
            ? "../production.env"
            : "../development.env"
    ),
});

console.log("process env index NODE_ENV:", process.env.NODE_ENV);
console.log("process env index SCHEMA_PORT:", process.env.SCHEMA_PORT);

startServer();
