import GoogleStrategy from "passport-google-oauth20";
import { userModel } from "../config/dataServices.service";
import { DateTime } from "luxon";

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
        if (existingUser[0] == null) {
            const newUser = await userModel.create({
                authUserId: profile.id,
                name: `${profile.name.givenName} ${profile.name.familyName}`,
                email: profile.emails[0].value,
                locale: profile._json.locale,
                createdDate: DateTime.utc(),
                version: 1,
                permissions: ["readDiaries", "readDiaryNotes"],
                active: true,
                points: 0,
            });
            return cb(null, newUser);
        }
        return cb(null, existingUser);
    }
);

export default googleStrategy;