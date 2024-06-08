import express from "express";
import passport from "passport";
import authController from "../controllers/index.controller";

const router = express.Router();

router.get("/auth/google", (req, res, next) => {
    passport.authenticate("google", { scope: ["profile", "email"] })(
        req,
        res,
        next
    );
});

router.get(
    "/auth/google/callback",
    (req, res, next) => {
        passport.authenticate("google", {
            failureRedirect: "/login",
            failureMessage: true,
        })(req, res, next);
    },
    authController.handleAuth
);

router.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Health check passed",
        uptime: process.uptime(),
    });
});

router.get("/test", (req, res) => {
    res.cookie("jwtToken", "tokenExample", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        // use this code when we setup https
        // secure: process.env.NODE_ENV === "production",
        // sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
        path: "/",
    });

    res.redirect(`${process.env.CLIENTSIDE_URL}/dashboard/diaries`);
});

export default router;
