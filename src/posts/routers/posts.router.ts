import { Router } from "express";
import { POSTS_ROUTES } from "../constants/posts.paths";
import { getPostsListHandler } from "../handlers/get-posts-list.handler";
import { getPostHendler } from "../handlers/get-post.hendler";
import { idValidation } from "../../core/validation/id-validation";
import { inputValidationResultMiddleware } from "../../core/validation/input-validation-result.middleware";
import { postInputDtoValidation } from "../validation/post-input-dto.validation";
import { createPostHandler } from "../handlers/create-post.handler";
import { updatePostHandler } from "../handlers/update-post.handler";
import { deletePostHandler } from "../handlers/delete-post.handler";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard.middleware";

export const postsRouter = Router({});

postsRouter
    .get(POSTS_ROUTES.ROOT, getPostsListHandler)

    .get(
        POSTS_ROUTES.BY_ID,
        idValidation,
        inputValidationResultMiddleware,
        getPostHendler,
    )

    .post(
        POSTS_ROUTES.ROOT,
        superAdminGuardMiddleware,
        postInputDtoValidation,
        inputValidationResultMiddleware,
        createPostHandler,
    )

    .put(
        POSTS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        idValidation,
        postInputDtoValidation,
        inputValidationResultMiddleware,
        updatePostHandler,
    )

    .delete(
        POSTS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        idValidation,
        inputValidationResultMiddleware,
        deletePostHandler,
    );
