import { UnauthorizedError } from "@/errors";
import { IAuthLoginRequestDTO, IAuthRegisterRequestDTO } from "@/features/auth/auth.interface";
import { IUser, IUserDTO } from "@/features/users/users.interface";
import usersService from "@/features/users/users.service";
import mapper from "@/mappings";
import jwtUtils from "@/utils/jwt-utils";

export const register = async (requestDTO: IAuthRegisterRequestDTO) => {
  const { email, password } = requestDTO;
  const { salt, hash } = jwtUtils.generatePassword(password);

  const user = await usersService.create({ email, hash, salt });

  const token = jwtUtils.issueJWT(user);
  const userDTO = mapper.map<IUser, IUserDTO>(user, "IUser", "IUserDTO");

  return { user: userDTO, token };
};

export const login = async (requestDTO: IAuthLoginRequestDTO) => {
  const { email, password } = requestDTO;

  const user = await usersService.findByEmail(email);

  const isValid = jwtUtils.validatePassword(password, user.hash, user.salt);

  if (!isValid) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = jwtUtils.issueJWT(user);
  const userDTO = mapper.map<IUser, IUserDTO>(user, "IUser", "IUserDTO");

  return { user: userDTO, token };
};

export default {
  register,
  login,
};
