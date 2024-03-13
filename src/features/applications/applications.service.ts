import mongoose from "mongoose";

import { NotFoundError, UnauthorizedError } from "@/errors";
import { IApplication, IApplicationDTO } from "@/features/applications/applications.interface";
import ApplicationModel from "@/features/applications/applications.model";
import jobsService from "@/features/jobs/jobs.service";
import mapper from "@/mappings";

// Create a new job application
const createJobApplication = async (jobId: mongoose.Types.ObjectId, requestDTO: Partial<IApplication>) => {
  // Check if job exists
  const job = await jobsService.getJob(jobId);
  // Create application
  const application = await ApplicationModel.create({ jobId: job._id, ...requestDTO });
  // Check if application is created
  if (!application) {
    throw new Error("Application not created");
  }

  return mapper.map<IApplication, IApplicationDTO>(application, "IApplication", "IApplicationDTO");
};

// Get all job applications
const getAllJobApplications = async (jobId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
  const job = await jobsService.getJob(jobId);
  // Check if user is creator of job
  if (job.createdBy.toString() !== userId.toString()) {
    throw new UnauthorizedError("Unauthorized to view applications");
  }

  const applications = await ApplicationModel.find({
    jobId: job._id,
  });
  // Check if applications exist
  if (!applications) {
    throw new NotFoundError("Applications not found");
  }

  return applications.map((application) =>
    mapper.map<IApplication, IApplicationDTO>(application, "IApplication", "IApplicationDTO"),
  );
};

const getAllApplications = async (userId: mongoose.Types.ObjectId) => {
  const applications = await ApplicationModel.find({
    createdBy: userId,
  });
  // Check if applications exist
  if (!applications) {
    throw new NotFoundError("Applications not found");
  }
  return applications.map((application) =>
    mapper.map<IApplication, IApplicationDTO>(application, "IApplication", "IApplicationDTO"),
  );
};

const getApplication = async (applicationId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
  const application = await ApplicationModel.findOne({
    _id: applicationId,
  });
  // Check if application exists
  if (!application) {
    throw new NotFoundError(applicationId);
  }
  // Check if user is creator of application
  if (application.createdBy.toString() !== userId.toString()) {
    const job = await jobsService.getJob(application.jobId);
    // Check if user is creator of job
    if (job.createdBy.toString() !== userId.toString()) {
      throw new UnauthorizedError("Unauthorized to view application");
    }
  }
  return mapper.map<IApplication, IApplicationDTO>(application, "IApplication", "IApplicationDTO");
};

const deleteApplication = async (applicationId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
  const application = await ApplicationModel.findOneAndDelete({
    _id: applicationId,
    createdBy: userId,
  });
  // Check if application is deleted
  if (!application) {
    throw new NotFoundError(applicationId);
  }
  return mapper.map<IApplication, IApplicationDTO>(application, "IApplication", "IApplicationDTO");
};

const updateApplication = async (
  applicationId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  requestDTO: Partial<IApplication>,
) => {
  const application = await ApplicationModel.findOne({
    _id: applicationId,
  });
  // Check if application exists
  if (!application) {
    throw new NotFoundError(applicationId);
  }

  // Check if user is creator of application
  if (application.createdBy.toString() === userId.toString()) {
    const updatePayload = { resume: requestDTO.resume };
    const application = await ApplicationModel.findOneAndUpdate(
      { _id: applicationId, createdBy: userId },
      { ...updatePayload },
      { new: true },
    );
    return mapper.map<IApplication, IApplicationDTO>(application, "IApplication", "IApplicationDTO");
  }

  // Check if user is creator of job
  const job = await jobsService.getJob(application.jobId);
  if (job.createdBy.toString() === userId.toString()) {
    const updatePayload = { status: requestDTO.status };
    const application = await ApplicationModel.findOneAndUpdate(
      { _id: applicationId },
      { ...updatePayload },
      { new: true },
    );
    return mapper.map<IApplication, IApplicationDTO>(application, "IApplication", "IApplicationDTO");
  }

  throw new UnauthorizedError("Unauthorized to update application");
};

export default {
  getAllApplications,
  getApplication,
  deleteApplication,
  createJobApplication,
  getAllJobApplications,
  updateApplication,
};
