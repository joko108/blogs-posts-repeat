import { Router } from "express";
import { AUTH_ROUTES } from "../constants/auth.path";
import { passwordValidation } from "../validation/password-input-dto.validation";
import { loginOrEmailValidation } from "../validation/login-or-email-input-dto.validation";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { authPostHandler } from "./handlers/auth-post.handler";
import { accessTokenGuard } from "../guards/access-token.guard";
import {authGetHandler} from "./handlers/auth-get.handler";

export const authRouter = Router({});

authRouter.post(
    AUTH_ROUTES.BY_LOGIN,
    passwordValidation,
    loginOrEmailValidation,
    inputValidationResultMiddleware,
    authPostHandler
);

authRouter.get(
    AUTH_ROUTES.ME,
    accessTokenGuard,
    authGetHandler,
);
