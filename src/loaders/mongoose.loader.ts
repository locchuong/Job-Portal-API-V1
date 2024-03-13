import mongoose from "mongoose";

import config from "@/configs";

export default async (): Promise<mongoose.mongo.Db> => {
  const connection = await mongoose.connect(config.database.uri);
  return connection.connection.db;
};
