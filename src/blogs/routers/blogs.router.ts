import { RequestHandler, Router } from "express";
import { BLOGS_ROUTES } from "../constants/blogs.paths";
import { getBlogsListHandler } from "./handlers/get-blogs-list.handler";
import { getBlogHandler } from "./handlers/get-blog.handler";
import { createBlogHandler } from "./handlers/create-blog.handler";
import { updateBlogHandler } from "./handlers/update-blog.handler";
import { deleteBlogHandler } from "./handlers/delete-blog.handler";
import { blogInputDtoValidation } from "../validation/blog-input-dto.validation";
import {
    blogIdParamValidation,
    paramIdValidation
} from "../../core/middlewares/validation/param-id.validation";
import { inputValidationResultMiddleware } from "../../core/middlewares/validation/input-validation-result.middleware";
import { superAdminGuardMiddleware } from "../../auth/middlewares/super-admin.guard.middleware";
import {
    paginationSortingValidationMiddleware
} from "../../core/middlewares/validation/query-pagenation-sorting.validation.middleware";
import { BlogSortField } from "./input/blog-sort-field";
import { sanitizeQueryParamsMiddleware } from "../../core/middlewares/validation/sanitize-query.middleware";
import { PostSortField } from "../../posts/routers/input/post-sort-field";
import { getPostsByBlogIdHandler } from "./handlers/get-posts-by-blog-id.handler";
import {
    postInputDtoWithoutBlogIdValidationMiddleware
} from "../../posts/validation/post-input-dto.validation-middleware";
import { createPostForBlogHandler } from "../../posts/routers/handlers/create-post-for-blog.handler";

export const blogsRouter = Router({});

blogsRouter
    .get(
        BLOGS_ROUTES.ROOT,
        paginationSortingValidationMiddleware(BlogSortField),
        inputValidationResultMiddleware,
        sanitizeQueryParamsMiddleware,
        getBlogsListHandler as unknown as RequestHandler
    )

    .get(
        BLOGS_ROUTES.BY_ID,
        paramIdValidation,
        inputValidationResultMiddleware,
        getBlogHandler,
    )

    .post(
        BLOGS_ROUTES.ROOT,
        superAdminGuardMiddleware,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        createBlogHandler,
    )

    .put(
        BLOGS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        paramIdValidation,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        updateBlogHandler,
    )

    .delete(
        BLOGS_ROUTES.BY_ID,
        superAdminGuardMiddleware,
        paramIdValidation,
        inputValidationResultMiddleware,
        deleteBlogHandler,
    )

    .get(
        BLOGS_ROUTES.BY_ID_FOR_POSTS,
        blogIdParamValidation,
        paginationSortingValidationMiddleware(PostSortField),
        inputValidationResultMiddleware,
        sanitizeQueryParamsMiddleware,
        getPostsByBlogIdHandler as unknown as RequestHandler
    )

    .post(
        BLOGS_ROUTES.BY_ID_FOR_POSTS,
        superAdminGuardMiddleware,
        blogIdParamValidation,
        postInputDtoWithoutBlogIdValidationMiddleware,
        inputValidationResultMiddleware,
        createPostForBlogHandler
    );
