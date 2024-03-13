import { Express } from "express";

import expressLoader from "@/loaders/express.loader";
import Logger from "@/loaders/logger.loader";
import mongooseLoader from "@/loaders/mongoose.loader";
import passportLoader from "@/loaders/passport.loader";

export const loaders = async (app: Express) => {
  await mongooseLoader();
  Logger.info("DB loaded!");

  await passportLoader(app);
  Logger.info("Passport loaded!");

  await expressLoader(app);
  Logger.info("Express loaded!");
};
