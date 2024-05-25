import AbstractController from "./AbstractController.controller";
import jwt from "jsonwebtoken";
import { User } from "../__generated__/types";

class AuthController extends AbstractController {
    public handleAuth(req, res) {
        console.log("handle auth user:", req.user);
        const user = req.user as User;
        const token = jwt.sign(
            { id: user.authUserId },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );
        res.cookie(
            "token",
            { token: token, user: user },
            {
                httpOnly: true,
                secure: true,
                sameSite: "None",
            }
        );
        res.redirect(`${process.env.CLIENTSIDE_URL}/dashboard/diaries`);
    }
}

export default AuthController;
