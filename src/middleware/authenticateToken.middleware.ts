import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    console.log("auth token hit");
    // if (process.env.NODE_ENV === "development" && req.path === "/") {
    //     return next();
    // }
    console.log("req.cookies:", req.cookies);
    const token = req.cookies.jwtToken;
    if (token == null)
        return res.send({
            code: 401,
            message: "Access denied, no JSON Web token available.",
        });
    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err: any, user: any) => {
            if (err) return res.sendStatus(403);
            req.user = user;
            next();
        }
    );
}
