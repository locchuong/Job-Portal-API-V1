import cors from "cors";
import express, { Express } from "express";

import config from "@/configs";
import errorMiddleware from "@/middlewares/error.middleware";
import rateLimitMiddleware from "@/middlewares/rate-limit.middleware";
import routes from "@/routes";

export default (app: Express) => {
  app.use(cors());
  app.use(express.json());

  app.use(rateLimitMiddleware);

  app.use(config.api.prefix, routes());

  app.use(errorMiddleware);
};
