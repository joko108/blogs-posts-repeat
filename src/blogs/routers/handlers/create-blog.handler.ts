import { Request, Response } from "express";
import { BlogsAttributes } from "../../application/dtos/blogs-attributes";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToBlogViewModelUtils } from "../mappers/map-to-blog-view-model.utils";
import { blogsService } from "../../application/blogs.service";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";

// Controller for create blog, it don't know what happen in database,
// his task: accept request -> redirect it to the repo -> accept received data -> return response.
export const createBlogHandler = async (
    req: Request<{}, {}, BlogsAttributes>,
    res: Response
) => {
    try {
        const createdBlogId = await blogsService.create(req.body);

        const createdBlog = await blogsService.findById(createdBlogId);
        if (!createdBlog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        const blogViewModel = mapToBlogViewModelUtils(createdBlog);  // Mapping to view-model.
        res.status(HttpStatus.Created_201).send(blogViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
