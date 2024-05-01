import MongoStore from "connect-mongo";

const sessionConfig = {
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_DSN,
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    }, // 1 day
    pauseStream: false,
};

export default sessionConfig;
