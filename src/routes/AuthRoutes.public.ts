import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { IUser } from "../graphql/user.types";

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
    function (req, res) {
        const user = req.user as IUser;
        const token = jwt.sign(
            { id: user.authUserId },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );
        res.send({ user: user, token: token });
    }
);

export default router;
