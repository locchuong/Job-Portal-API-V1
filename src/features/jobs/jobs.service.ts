import mongoose from "mongoose";

import { NotFoundError } from "@/errors";
import { IJob, IJobDTO } from "@/features/jobs/jobs.interface";
import JobModel from "@/features/jobs/jobs.model";
import mapper from "@/mappings";
import queryUtil from "@/utils/query-utils";

const createJob = async (requestDTO: Partial<IJob>) => {
  const job = await JobModel.create(requestDTO);
  if (!job) {
    throw new Error("Job not created");
  }
  return mapper.map<IJob, IJobDTO>(job, "IJob", "IJobDTO");
};

const getAllJobs = async (query: Partial<IJob>, sort: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const jobs = await JobModel.find({
    ...queryUtil.getStringFilter({
      title: query.title,
      description: query.description,
      company: query.company,
      location: query.location,
    }),
    ...queryUtil.getArrayFilter({
      requirements: query.requirements,
    }),
    salaryMin: {
      $gte: query.salaryMin,
    },
    salaryMax: {
      $lte: query.salaryMax,
    },
    ...(query.createdBy && { createdBy: new mongoose.Types.ObjectId(query.createdBy) }),
  })
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .maxTimeMS(5000);

  return jobs.map((job) => mapper.map<IJob, IJobDTO>(job, "IJob", "IJobDTO"));
};

const getJob = async (jobId: mongoose.Types.ObjectId) => {
  const job = await JobModel.findOne({
    _id: jobId,
  });
  if (!job) {
    throw new NotFoundError(jobId);
  }
  return mapper.map<IJob, IJobDTO>(job, "IJob", "IJobDTO");
};

const updateJob = async (
  jobId: mongoose.Types.ObjectId,
  userId: mongoose.Types.ObjectId,
  requestDTO: Partial<IJob>,
) => {
  const job = await JobModel.findOneAndUpdate({ _id: jobId, createdBy: userId }, { ...requestDTO }, { new: true });
  if (!job) {
    throw new NotFoundError(jobId);
  }
  return mapper.map<IJob, IJobDTO>(job, "IJob", "IJobDTO");
};

const deleteJob = async (jobId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
  const job = await JobModel.findOneAndDelete({ _id: jobId, createdBy: userId });
  if (!job) {
    throw new NotFoundError(jobId);
  }
  return mapper.map<IJob, IJobDTO>(job, "IJob", "IJobDTO");
};

export default {
  createJob,
  getJob,
  getAllJobs,
  updateJob,
  deleteJob,
};
