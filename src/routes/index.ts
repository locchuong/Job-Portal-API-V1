import { Router } from "express";

import applicationsRouter from "@/features/applications/applications.route";
import authRouter from "@/features/auth/auth.route";
import jobRouter from "@/features/jobs/jobs.route";

export default () => {
  const app = Router();

  authRouter(app);
  jobRouter(app);
  applicationsRouter(app);

  return app;
};
