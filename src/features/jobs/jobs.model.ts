import mongoose from "mongoose";

export const JobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    requirements: {
      type: [String],
      required: true,
      maxlength: 200,
    },
    company: {
      type: String,
      required: true,
      maxlength: 50,
    },
    location: {
      type: String,
      required: true,
      maxlength: 100,
    },
    salaryMin: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (this: { salaryMin: number; salaryMax: number }) {
          return this.salaryMin <= this.salaryMax;
        },
        message: "Minimum salary must be less than maximum salary",
      },
    },
    salaryMax: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (this: { salaryMin: number; salaryMax: number }) {
          return this.salaryMax >= this.salaryMin;
        },
        message: "Maximum salary must be greater than minimum salary",
      },
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const JobModel = mongoose.model("Job", JobSchema);

export default JobModel;
