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

router.get("/health", (req, res) => {
    console.log("I have been called");
    res.status(200).json({
        status: "success",
        message: "Health check passed",
        uptime: process.uptime(),
    });
});

export default router;
