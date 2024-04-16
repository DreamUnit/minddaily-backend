import express from "express";
import { authenticateToken } from "../middleware/authenticateToken.middleware";

const router = express.Router();

router.post("/", authenticateToken);

export default router;
