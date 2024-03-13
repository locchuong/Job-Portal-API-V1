import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import applicationsService from "@/features/applications/applications.service";
import { IJob } from "@/features/jobs/jobs.interface";
import jobsService from "@/features/jobs/jobs.service";
import authMiddleware from "@/middlewares/auth.middleware";
import joiUtils from "@/utils/joi-utils";
import mongooseUtils from "@/utils/mongoose-utils";

const router = Router();

export default (app: Router) => {
  app.use("/jobs", authMiddleware, router);

  // Create a new job
  router.post(
    "/",
    celebrate({
      [Segments.BODY]: Joi.object<IJob>({
        title: Joi.string().required(),
        description: Joi.string().required(),
        requirements: Joi.array().items(Joi.string()).min(1).required(),
        company: Joi.string().required(),
        location: Joi.string().required(),
        salaryMin: Joi.number().required(),
        salaryMax: Joi.number().required(),
      })
        .min(1)
        .required(),
    }),
    async (req, res, next) => {
      try {
        const {
          user: { _id: userId },
        } = req;
        const job = await jobsService.createJob({ ...req.body, createdBy: userId });
        return res.status(StatusCodes.CREATED).json(job);
      } catch (err) {
        return next(err);
      }
    },
  );

  // Get all jobs
  router.get(
    "/",
    celebrate({
      [Segments.QUERY]: Joi.object({
        title: Joi.string().alphanum().default(""),
        description: Joi.string().alphanum().default(""),
        requirements: Joi.string().alphanum().default(""),
        company: Joi.string().alphanum().default(""),
        location: Joi.string().alphanum().default(""),
        salaryMin: Joi.number().default(0),
        salaryMax: Joi.number().default(Infinity),
        createdBy: joiUtils.ObjectId(),
        // Pagination
        sort: Joi.string().default("createdAt"),
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
      }),
    }),
    async (req, res, next) => {
      try {
        const { sort, limit, page, ...query } = req.query;
        const jobs = await jobsService.getAllJobs(
          query,
          sort as string,
          parseInt(page as string),
          parseInt(limit as string),
        );
        return res.status(StatusCodes.OK).json(jobs);
      } catch (err) {
        return next(err);
      }
    },
  );

  // Get a single job
  router.get(
    "/:jobId",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        jobId: joiUtils.ObjectId().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const job = await jobsService.getJob(mongooseUtils.toObjectId(req.params.jobId));
        return res.status(StatusCodes.OK).json(job);
      } catch (err) {
        return next(err);
      }
    },
  );

  // Update a job
  router.patch(
    "/:jobId",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        jobId: joiUtils.ObjectId().required(),
      }),
      [Segments.BODY]: Joi.object<IJob>({
        title: Joi.string(),
        description: Joi.string(),
        requirements: Joi.array().items(Joi.string()),
        company: Joi.string(),
        location: Joi.string(),
        salaryMin: Joi.number(),
        salaryMax: Joi.number(),
      })
        .min(1)
        .required(),
    }),
    async (req, res, next) => {
      try {
        const job = await jobsService.updateJob(mongooseUtils.toObjectId(req.params.jobId), req.user._id, req.body);
        return res.status(StatusCodes.OK).json(job);
      } catch (err) {
        return next(err);
      }
    },
  );

  // Delete a job
  router.delete(
    "/:jobId",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        jobId: joiUtils.ObjectId().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        await jobsService.deleteJob(mongooseUtils.toObjectId(req.params.jobId), req.user._id);
        return res.status(StatusCodes.NO_CONTENT).send();
      } catch (err) {
        return next(err);
      }
    },
  );

  // Create a job application
  router.post(
    "/:jobId/applications",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        jobId: joiUtils.ObjectId().required(),
      }),
      [Segments.BODY]: Joi.object({
        resume: Joi.string().required(),
      })
        .min(1)
        .required(),
    }),
    async (req, res, next) => {
      try {
        const {
          params: { jobId },
          user: { _id: userId },
          body,
        } = req;
        const application = await applicationsService.createJobApplication(mongooseUtils.toObjectId(jobId), {
          ...body,
          createdBy: userId,
        });
        return res.status(StatusCodes.CREATED).json(application);
      } catch (err) {
        return next(err);
      }
    },
  );

  // Get all applications for a job
  router.get(
    "/:jobId/applications",
    celebrate({
      [Segments.PARAMS]: Joi.object({
        jobId: joiUtils.ObjectId().required(),
      }),
    }),
    async (req, res, next) => {
      try {
        const {
          params: { jobId },
          user: { _id: userId },
        } = req;
        const applications = await applicationsService.getAllJobApplications(mongooseUtils.toObjectId(jobId), userId);
        return res.status(StatusCodes.OK).json(applications);
      } catch (err) {
        return next(err);
      }
    },
  );
};
