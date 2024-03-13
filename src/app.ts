import express from "express";

import config from "@/configs";
import { loaders } from "@/loaders";
import Logger from "@/loaders/logger.loader";

async function startServer() {
  const app = express();
  await loaders(app);

  app
    .listen(config.api.port, () => {
      Logger.info(`Server listening on port: ${config.api.port}...`);
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startServer();
