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

startServer();
