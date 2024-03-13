import mongoose from "mongoose";

import { IJob, IJobDTO } from "@/features/jobs/jobs.interface";
import { Mapper, createMap } from "@automapper/core";
import { PojosMetadataMap } from "@automapper/pojos";

import { IApplication, IApplicationDTO } from "./applications.interface";

export default (mapper: Mapper) => {
  PojosMetadataMap.create<IApplication>("IApplication", {
    _id: mongoose.Types.ObjectId,
    jobId: mongoose.Types.ObjectId,
    status: String,
    createdBy: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    __v: Number,
  });

  PojosMetadataMap.create<IApplicationDTO>("IApplicationDTO", {
    _id: mongoose.Types.ObjectId,
    jobId: mongoose.Types.ObjectId,
    status: String,
    createdBy: mongoose.Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
  });
  createMap<IApplication, IApplicationDTO>(mapper, "IApplication", "IApplicationDTO");
};
