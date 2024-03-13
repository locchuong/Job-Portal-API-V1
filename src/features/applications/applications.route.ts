import { Segments, celebrate } from "celebrate";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";

import { IApplication } from "@/features/applications/applications.interface";
import applicationsService from "@/features/applications/applications.service";
import authMiddleware from "@/middlewares/auth.middleware";
import joiUtils from "@/utils/joi-utils";
import mongooseUtils from "@/utils/mongoose-utils";

export const router = Router({ mergeParams: true });

export default (app: Router) => {
  app.use("/applications", authMiddleware, router);

  // Get all applications owned by the user
  router.get("/", async (req, res, next) => {
    try {
      const {
        user: { _id: userId },
      } = req;
      const application = await applicationsService.getAllApplications(userId);
      return res.status(StatusCodes.OK).json(application);
    } catch (err) {
      return next(err);
    }
  });

  // Get application owned by the user
  router.get(
    "/:applicationId",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        applicationId: joiUtils.ObjectId().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const {
          user: { _id: userId },
          params: { applicationId },
        } = req;
        const application = await applicationsService.getApplication(mongooseUtils.toObjectId(applicationId), userId);
        return res.status(StatusCodes.OK).json(application);
      } catch (err) {
        return next(err);
      }
    },
  );

  // Delete application owned by the user
  router.delete(
    "/:applicationId",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        applicationId: joiUtils.ObjectId().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const {
          user: { _id: userId },
          params: { applicationId },
        } = req;
        await applicationsService.deleteApplication(mongooseUtils.toObjectId(applicationId), userId);
        return res.status(StatusCodes.NO_CONTENT).send();
      } catch (err) {
        return next(err);
      }
    },
  );

  router.patch(
    "/:applicationId",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        applicationId: joiUtils.ObjectId().required(),
      }),
      [Segments.BODY]: Joi.object<Partial<IApplication>>({
        status: Joi.string().valid("Pending", "Accepted", "Rejected"),
        resume: Joi.string(),
      })
        .min(1)
        .required(),
    }),
    async (req, res, next) => {
      try {
        const {
          user: { _id: userId },
          params: { applicationId },
        } = req;
        const application = await applicationsService.updateApplication(
          mongooseUtils.toObjectId(applicationId),
          userId,
          req.body,
        );
        return res.status(StatusCodes.OK).json(application);
      } catch (err) {
        return next(err);
      }
    },
  );
};
