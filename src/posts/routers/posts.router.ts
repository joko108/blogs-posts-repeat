import { RequestHandler, Router } from "express";
import { POSTS_ROUTES } from "../constants/posts.paths";
import { getPostsListHandler } from "./handlers/get-posts-list.handler";
import { getPostHandler } from "./handlers/get-post.hendler";
import {paramIdValidation, postIdParamValidation} from "../../core/middlewares/validation/param-id.validation";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { postInputDtoValidationMiddleware } from "../validation/post-input-dto.validation-middleware";
import { createPostHandler } from "./handlers/create-post.handler";
import { updatePostHandler } from "./handlers/update-post.handler";
import { deletePostHandler } from "./handlers/delete-post.handler";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard.middleware";
import {
    paginationSortingValidationMiddleware
} from "../../core/middlewares/validation/query-pagination-sorting.validation.middleware";
import { PostSortField } from "./input/post-sort-field";
import { sanitizeQueryParamsMiddleware } from "../../core/middlewares/validation/sanitize-query.middleware";
import { contentValidation } from "../../comments/validation/commentInputDtoValidation";
import { accessTokenGuard } from "../../auth/guards/access-token.guard";
import { createCommentForPostHandler } from "../../comments/router/handlers/create-comment-for-post.handler";
import { getCommentsListsByPostIdHandler } from "../../comments/router/handlers/get-comments-lists-by-post-id.handler";
import { CommentsSortField } from "../../comments/router/input/comments-sort-field";


export const postsRouter = Router({});

postsRouter
    .get(
        POSTS_ROUTES.ROOT,
        paginationSortingValidationMiddleware(PostSortField),
        inputValidationResultMiddleware,
        sanitizeQueryParamsMiddleware,
        getPostsListHandler as unknown as RequestHandler
    )

    .get(
        POSTS_ROUTES.BY_ID,
        paramIdValidation,
        inputValidationResultMiddleware,
        getPostHandler,
    )

    .post(
        POSTS_ROUTES.ROOT,
        superAdminGuardMiddleware,
        postInputDtoValidationMiddleware,
        inputValidationResultMiddleware,
        createPostHandler,
    )

    .put(
        POSTS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        paramIdValidation,
        postInputDtoValidationMiddleware,
        inputValidationResultMiddleware,
        updatePostHandler,
    )

    .delete(
        POSTS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        paramIdValidation,
        inputValidationResultMiddleware,
        deletePostHandler,
    )

    .get(
        POSTS_ROUTES.BY_ID_FOR_COMMENTS,
        postIdParamValidation,
        paginationSortingValidationMiddleware(CommentsSortField),
        inputValidationResultMiddleware,
        sanitizeQueryParamsMiddleware,
        getCommentsListsByPostIdHandler as unknown as RequestHandler
    )

    .post(
        POSTS_ROUTES.BY_ID_FOR_COMMENTS,
        postIdParamValidation,
        accessTokenGuard,
        contentValidation,
        inputValidationResultMiddleware,
        createCommentForPostHandler
    );
