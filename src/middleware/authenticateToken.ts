import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
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
