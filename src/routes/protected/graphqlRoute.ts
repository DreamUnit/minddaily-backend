import express from "express";
import { authenticateToken } from "../../middleware/authenticateToken";

const protectedRouter = express.Router();

protectedRouter.post("/", authenticateToken);

export default protectedRouter;
