import GoogleStrategy from "passport-google-oauth20";
import { userModel } from "../features/index.model";

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.CALL_BACK_URL,
    },
    async function (_, __, profile, cb) {
        const existingUser = await userModel.readByField({
            field: "authUserId",
            stringValue: profile.id,
        });
        if (existingUser.length === 0) {
            const newUser = await userModel.create({
                authUserId: profile.id,
                name: `${profile.name.givenName} ${profile.name.familyName}`,
                email: profile.emails[0].value,
                locale: profile._json.locale || "unknown",
            });
            return cb(null, newUser);
        }
        return cb(null, existingUser);
    }
);

export default googleStrategy;
