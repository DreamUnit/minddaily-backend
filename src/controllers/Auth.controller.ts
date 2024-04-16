import AbstractController from "./AbstractController.controller";
import jwt from "jsonwebtoken";
import { IUser } from "../features/user/user.types";

class AuthController extends AbstractController {
    handleAuth(req, res) {
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
}

export default AuthController;
