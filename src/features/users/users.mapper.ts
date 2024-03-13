import mongoose from "mongoose";

import { IUser, IUserDTO } from "@/features/users/users.interface";
import { Mapper, createMap } from "@automapper/core";
import { PojosMetadataMap } from "@automapper/pojos";

export default (mapper: Mapper) => {
  PojosMetadataMap.create<IUser>("IUser", {
    _id: mongoose.Types.ObjectId,
    email: String,
    hash: String,
    salt: String,
    __v: Number,
  });

  PojosMetadataMap.create<IUser>("IUserDTO", {
    _id: mongoose.Types.ObjectId,
    email: String,
  });
  createMap<IUser, IUserDTO>(mapper, "IUser", "IUserDTO");
};
