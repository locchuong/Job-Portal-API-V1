import mongoose from "mongoose";

export const ApplicationSchema = new mongoose.Schema(
  {
    jobId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      default: "Pending",
    },
    resume: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Do not allow duplicate applications for the same job by the same user
ApplicationSchema.index({ jobId: 1, createdBy: 1 }, { unique: true });

const ApplicationModel = mongoose.model("Application", ApplicationSchema);

export default ApplicationModel;
