import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

import { ApplicationSchema } from "@/features/applications/applications.model";

export interface IApplication extends HydratedDocument<InferSchemaType<typeof ApplicationSchema>> {}

export interface IApplicationDTO {
  _id: mongoose.Types.ObjectId;
  jobId: mongoose.Types.ObjectId;
  status: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
