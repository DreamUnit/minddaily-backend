import * as expressSession from "express-session";
declare global {
    namespace Express {
        interface Request {
            session: expressSession.Session &
                Partial<expressSession.SessionData>;
        }
    }
}
