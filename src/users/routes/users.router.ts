import { Router, RequestHandler } from "express";
import { USERS_ROUTES } from "../constants/user.paths";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard.middleware";
import {
    paginationSortingValidationMiddleware
} from "../../core/middlewares/validation/query-pagenation-sorting.validation.middleware";
import { UserSortField } from "./input/user-sort-field";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { sanitizeQueryParamsMiddleware } from "../../core/middlewares/validation/sanitize-query.middleware";
import { getUsersListHandler } from "./handlers/get-users-list.handler";
import { userInputDtoValidation } from "../validation/user-input-dto.validation";
import { createUserHandler } from "./handlers/create-user.handler";
import { paramIdValidation } from "../../core/middlewares/validation/param-id.validation";
import { deleteUserHandler } from "./handlers/delete-user.handler";

export const usersRouter = Router ({});

usersRouter
    .get(
        USERS_ROUTES.ROOT,
        superAdminGuardMiddleware,
        paginationSortingValidationMiddleware(UserSortField),
        inputValidationResultMiddleware,
        sanitizeQueryParamsMiddleware,
        getUsersListHandler as unknown as RequestHandler
    )

    .post(
        USERS_ROUTES.ROOT,
        superAdminGuardMiddleware,
        userInputDtoValidation,
        inputValidationResultMiddleware,
        createUserHandler
    )

    .delete(
        USERS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        paramIdValidation,
        inputValidationResultMiddleware,
        deleteUserHandler
    );
