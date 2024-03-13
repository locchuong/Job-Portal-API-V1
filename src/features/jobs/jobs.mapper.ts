import mongoose from "mongoose";

import { IJob, IJobDTO } from "@/features/jobs/jobs.interface";
import { Mapper, createMap } from "@automapper/core";
import { PojosMetadataMap } from "@automapper/pojos";

export default (mapper: Mapper) => {
  PojosMetadataMap.create<IJob>("IJob", {
    _id: mongoose.Types.ObjectId,
    title: String,
    description: String,
    requirements: [String],
    company: String,
    location: String,
    salaryMin: String,
    salaryMax: String,
    createdBy: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    __v: Number,
  });

  PojosMetadataMap.create<IJobDTO>("IJobDTO", {
    _id: mongoose.Types.ObjectId,
    title: String,
    description: String,
    requirements: [String],
    company: String,
    location: String,
    salaryMin: String,
    salaryMax: String,
    createdBy: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
  });
  createMap<IJob, IJobDTO>(mapper, "IJob", "IJobDTO");
};
