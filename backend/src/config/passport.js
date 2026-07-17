import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config({ path: './config.env' })
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;

                let user = await userModel.findOne({ email });

                if (!user) {
                    const randomPassword = await bcrypt.hash(profile.id, 10);

                    user = await userModel.create({
                        name: profile.displayName,
                        email,
                        password: randomPassword,
                        googleId: profile.id,
                        authProvider: "google",
                        isVerified: true,
                    });
                }

                return done(null, user);
            } catch (error) { return done(error, null); }
        })); export default passport;