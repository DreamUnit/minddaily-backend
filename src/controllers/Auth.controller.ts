import AbstractController from "./AbstractController.controller";
import jwt from "jsonwebtoken";
import { User } from "../__generated__/types";

class AuthController extends AbstractController {
    public handleAuth(req, res) {
        const user = req.user as User;
        const token = jwt.sign(
            { id: user.authUserId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie("jwtToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            // use this code when we setup https
            // secure: process.env.NODE_ENV === "production",
            // sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
            overwrite: true,
            path: "/",
            // change this to environment variable in the future.
            domain:
                process.env.NODE_ENV === "production"
                    ? ".joshibbotson.com"
                    : undefined,
        });

        res.redirect(`${process.env.CLIENTSIDE_URL}/dashboard/diaries`);
    }
}

export default AuthController;
