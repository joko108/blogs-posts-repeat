import { Router } from "express";
import { AUTH_ROUTES } from "../constants/auth.path";
import { passwordValidation } from "../validation/password-input-dto.validation";
import { loginOrEmailValidation } from "../validation/login-or-email-input-dto.validation";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { authHandler } from "./handlers/auth.handler";

export const authRouter = Router({});

authRouter.post(
    AUTH_ROUTES.BY_LOGIN,
    passwordValidation,
    loginOrEmailValidation,
    inputValidationResultMiddleware,
    authHandler
);
