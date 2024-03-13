import dotenv from "dotenv";
import fs from "fs";
import { Algorithm } from "jsonwebtoken";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import path from "path";

import UserModel from "@/features/users/users.model";

dotenv.config();

export const PUB_KEY = fs.readFileSync(path.join(__dirname, "..", "id_rsa_pub.pem"), "utf8");
export const PRIV_KEY = fs.readFileSync(path.join(__dirname, "..", "id_rsa_priv.pem"), "utf8");

// Passport strategy options
const strategyOptions: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: [process.env.JWT_ALGO as Algorithm],
};

// Passport strategy
export const strategy = new Strategy(strategyOptions, (payload, done) => {
  UserModel.findOne({ _id: payload.sub })
    .then((user) => {
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => done(err, null));
});
