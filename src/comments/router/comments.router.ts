import { Router, RequestHandler } from "express";
import { COMMENTS_ROUTES } from "../constants/comments.paths";
import { paramIdValidation, postIdParamValidation } from "../../core/middlewares/validation/param-id.validation";
import { contentValidation } from "./ validation/commentInputDtoValidation";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { getCommentsListsByPostIdHandler } from "./handlers/get-comments-lists-by-post-id.handler";
import {
    paginationSortingValidationMiddleware
} from "../../core/middlewares/validation/query-pagination-sorting.validation.middleware";
import { CommentsSortField } from "./input/comments-sort-field";
import { sanitizeQueryParamsMiddleware } from "../../core/middlewares/validation/sanitize-query.middleware";
import { accessTokenGuard } from "../../auth/guards/access-token.guard";
import { createCommentForPostHandler } from "./handlers/create-comment-for-post.handler";
import { updateCommentHandler } from "./handlers/update-comment.handler";

export const commentsRouter = Router({});

commentsRouter
    .get(
        COMMENTS_ROUTES.BY_ID_FOR_POST,
        paramIdValidation,
        paginationSortingValidationMiddleware(CommentsSortField),
        inputValidationResultMiddleware,
        sanitizeQueryParamsMiddleware,
        getCommentsListsByPostIdHandler as unknown as RequestHandler
    )

    .post(
        COMMENTS_ROUTES.BY_ID_FOR_POST,
        postIdParamValidation,
        contentValidation,
        accessTokenGuard,
        inputValidationResultMiddleware,
        createCommentForPostHandler
    )

    .put(
        COMMENTS_ROUTES.BY_ID,
        paramIdValidation,
        contentValidation,
        accessTokenGuard,
        inputValidationResultMiddleware,
        updateCommentHandler
    )

    .delete(
        COMMENTS_ROUTES.BY_ID,
        paramIdValidation,
        accessTokenGuard,
        inputValidationResultMiddleware,
        updateCommentHandler
    );
