import { IUserCreateRequestDTO } from "@/features/users/users.interface";
import UserModel from "@/features/users/users.model";

async function findByEmail(email: string) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

async function create(requestDTO: IUserCreateRequestDTO) {
  const user = await UserModel.create(requestDTO);

  if (!user) {
    throw new Error("User not created");
  }

  return user;
}

export default {
  findByEmail,
  create,
};
