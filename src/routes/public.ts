import express from "express";
import passport from "passport";
import { authController } from "../config/dataServices.service";

const router = express.Router();

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login",
        failureMessage: true,
    }),
    authController.handleAuth
);

export default router;
