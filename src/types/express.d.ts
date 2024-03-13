declare namespace Express {
  export interface Request {
    user?: import("@/features/users/users.interface").IUser;
  }
}
