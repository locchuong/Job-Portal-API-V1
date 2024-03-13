import Joi from "joi";
import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v: string) => {
          return Joi.assert(v, Joi.string().email().required());
        },
      },
    },
    hash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
