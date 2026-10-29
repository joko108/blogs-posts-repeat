import { Request, Response } from "express";
import { PostsForBlogQueryInput } from "../../../posts/routers/input/post-query.input";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { mapToPostsListViewModelUtils } from "../../../posts/routers/mappers/map-to-posts-list-view-model.utils";
import { blogsService } from "../../application/blogs.service";
import { postsService } from "../../../posts/attributes/posts.service";

export const getPostsByBlogIdHandler = async (
    req: Request<{ blogId: string }, {}, {}, PostsForBlogQueryInput>,
    res: Response
) => {
    try {
        const blogId = req.params.blogId;
        const queryInput = req.query;

        // Check whether the blog exists.
        const blog = await blogsService.findById(blogId);
        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        const { items, totalCount } = await postsService.findManyByBlogId(blogId, queryInput);
        // Transform to view-model for return via API.
        const output = mapToPostsListViewModelUtils(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
        });

        res.status(HttpStatus.Ok_200).send(output);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
