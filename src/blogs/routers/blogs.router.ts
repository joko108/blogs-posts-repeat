import { Router } from "express";
import { BLOGS_ROUTES } from "../constants/blogs.paths";
import { getBlogsListHandler } from "../handlers/get-blogs-list.handler";
import { getBlogHandler } from "../handlers/get-blog.handler";
import { createBlogHandler } from "../handlers/create-blog.handler";
import { updateBlogHandler } from "../handlers/update-blog.handler";
import { deleteBlogHandler } from "../handlers/delete-blog.handler";
import { blogInputDtoValidation } from "../validation/blog-input-dto.validation";
import { idValidation } from "../../core/validation/id-validation";
import { inputValidationResultMiddleware } from "../../core/validation/input-validation-result.middleware";

export const blogsRouter = Router({});

blogsRouter
    .get(BLOGS_ROUTES.ROOT, getBlogsListHandler)

    .get(
        BLOGS_ROUTES.BY_ID,
        idValidation,
        inputValidationResultMiddleware,
        getBlogHandler
    )

    .post(
        BLOGS_ROUTES.ROOT,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        createBlogHandler
    )

    .put(
        BLOGS_ROUTES.BY_ID,
        idValidation,
        blogInputDtoValidation,
        inputValidationResultMiddleware,
        updateBlogHandler
    )

    .delete(
        BLOGS_ROUTES.BY_ID,
        idValidation,
        inputValidationResultMiddleware,
        deleteBlogHandler
    );
