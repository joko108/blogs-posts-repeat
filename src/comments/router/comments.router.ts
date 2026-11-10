import { Router } from "express";
import { COMMENTS_ROUTES } from "../constants/comments.paths";
import {
    commentIdParamValidation,
} from "../../core/middlewares/validation/param-id.validation";
import { contentValidation } from "../validation/commentInputDtoValidation";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { accessTokenGuard } from "../../auth/guards/access-token.guard";
import { updateCommentHandler } from "./handlers/update-comment.handler";
import { getCommentHandler } from "./handlers/get-comment.handler";
import { deleteCommentHandler } from "./handlers/delete-comment.handler";

export const commentsRouter = Router({});

commentsRouter
    .get(
        COMMENTS_ROUTES.BY_ID,
        commentIdParamValidation,
        inputValidationResultMiddleware,
        getCommentHandler
    )

    .put(
        COMMENTS_ROUTES.BY_ID,
        commentIdParamValidation,
        accessTokenGuard,
        contentValidation,
        inputValidationResultMiddleware,
        updateCommentHandler
    )

    .delete(
        COMMENTS_ROUTES.BY_ID,
        commentIdParamValidation,
        accessTokenGuard,
        inputValidationResultMiddleware,
        deleteCommentHandler
    );
