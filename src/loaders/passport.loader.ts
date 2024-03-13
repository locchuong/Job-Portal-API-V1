import { Express } from "express";
import passport from "passport";

import { strategy } from "@/configs/passport";

export default (app: Express) => {
  passport.use(strategy);
  app.use(passport.initialize());
};
