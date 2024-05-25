import express from "express";
import passport from "passport";
import authController from "../controllers/index.controller";

const router = express.Router();

router.get("/auth/google", (req, res, next) => {
    console.log("called auth route with query:", req.query, "body: ", req.body);
    passport.authenticate("google", { scope: ["profile", "email"] })(
        req,
        res,
        next
    );
});

router.get(
    "/auth/google/callback",
    (req, res, next) => {
        console.log(
            "google callback called with req:",
            req.query,
            "body:",
            req.body
        );

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

export default router;
