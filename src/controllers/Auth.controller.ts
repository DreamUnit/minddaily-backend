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
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "lax",
            overWrite: true,
            path: "/",
        });

        res.redirect(`${process.env.CLIENTSIDE_URL}/dashboard/diaries`);
    }
}

export default AuthController;
