import express from "express";
import passport from "passport";
import authController from "../controllers/index.controller";

const router = express.Router();

router.get("/auth/google", (req, res) => {
    console.log("called auth route with res:", req);
    console.log("called auth route with res:", res);

    passport.authenticate("google", { scope: ["profile", "email"] });
});

router.get("/auth/google/callback", (req, res) => {
    console.log("google callback called with req:", req);
    console.log("google callback called with res:", res);

    passport.authenticate("google", {
        failureRedirect: "/login",
        failureMessage: true,
    }),
        authController.handleAuth;
});

router.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Health check passed",
        uptime: process.uptime(),
    });
});

export default router;
