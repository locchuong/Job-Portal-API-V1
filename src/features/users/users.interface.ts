import mongoose, { HydratedDocument, InferSchemaType } from "mongoose";

import { UserSchema } from "@/features/users/users.model";

export interface IUser extends HydratedDocument<InferSchemaType<typeof UserSchema>> {}

export interface IUserDTO {
  _id: mongoose.Types.ObjectId;
  email: string;
}

export interface IUserCreateRequestDTO {
  email: string;
  hash: string;
  salt: string;
}
