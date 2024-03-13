import dotenv from "dotenv";

import { PRIV_KEY, PUB_KEY } from "@/configs/passport";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("Couldn't find .env file");
}

export default {
  // Database
  database: {
    uri: process.env.MONGODB_URI,
  },

  // Used by winston logger
  logs: {
    level: process.env.LOG_LEVEL || "silly",
  },

  // API configs
  api: {
    prefix: "/api",
    port: parseInt(process.env.PORT, 10) || 3000,
  },

  //Jwt secret key
  jwt: {
    algorithm: process.env.JWT_ALGO,
    expiresIn: process.env.JWT_LIFETIME,
    pubKey: PUB_KEY,
    privKey: PRIV_KEY,
  },
};
