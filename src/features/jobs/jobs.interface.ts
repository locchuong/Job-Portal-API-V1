import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

import { JobSchema } from "@/features/jobs/jobs.model";

export interface IJob extends HydratedDocument<InferSchemaType<typeof JobSchema>> {}

export interface IJobDTO {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  requirements: string[];
  company: string;
  location: string;
  salaryMin: string;
  salaryMax: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
