import { Joi, Segments, celebrate } from "celebrate";
import { Router } from "express";
import { StatusCodes } from "http-status-codes";

import { IAuthLoginRequestDTO, IAuthRegisterRequestDTO } from "@/features/auth/auth.interface";
import authService from "@/features/auth/auth.service";

const router = Router();

export default (app: Router) => {
  app.use("/auth", router);

  router.post(
    "/register",
    celebrate({
      [Segments.BODY]: Joi.object<IAuthRegisterRequestDTO>({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      })
        .min(1)
        .required(),
    }),
    async (req, res, next) => {
      try {
        const { user, token } = await authService.register(req.body);
        return res.status(StatusCodes.CREATED).json({ user, token });
      } catch (err) {
        return next(err);
      }
    },
  );

  router.post(
    "/login",
    celebrate({
      [Segments.BODY]: Joi.object<IAuthLoginRequestDTO>({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      })
        .min(1)
        .required(),
    }),
    async (req, res, next) => {
      try {
        const { user, token } = await authService.login(req.body);
        return res.status(StatusCodes.OK).json({ user, token });
      } catch (err) {
        return next(err);
      }
    },
  );
};
