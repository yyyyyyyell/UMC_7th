import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from 'passport-naver';
import { prisma } from "./db.config.js";

dotenv.config();

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const googleVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
  
    const user = await prisma.user.findFirst({ where: { account: email } });
    if (user !== null) {
      return { id: user.id, account: user.account, name: user.name };
    }
  
    const created = await prisma.user.create({
      data: {
        account: email,
        password:"추후 수정",
        name: profile.displayName,
        gender: "추후 수정",
        birth: new Date(1970, 0, 1)
      },
    });
  
    return { id: created.id, account: created.account, name: created.name };
  };

  export const naverStrategy = new NaverStrategy(
    {
      clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
      clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/oauth2/callback/naver",
      scope: ["email", "profile"],
      state: true,
    },
    (accessToken, refreshToken, profile, cb) => {
      return naverVerify(profile)
        .then((user) => cb(null, user))
        .catch((err) => cb(err));
    }
  );

  const naverVerify = async (profile) => {
    const email = profile.emails?.[0]?.value;
    if (!email) {
      throw new Error(`profile.email was not found: ${profile}`);
    }
  
    const user = await prisma.user.findFirst({ where: { account: email } });
    if (user !== null) {
      return { id: user.id, account: user.account, name: user.name };
    }
  
    const created = await prisma.user.create({
      data: {
        account: email,
        password:"추후 수정",
        name: profile.displayName,
        gender: "추후 수정",
        birth: new Date(1970, 0, 1)
      },
    });
  
    return { id: created.id, account: created.account, name: created.name };
  };