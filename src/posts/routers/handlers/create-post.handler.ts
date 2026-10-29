import { Request, Response } from "express";
import { PostAttributes } from "../../attributes/dto/post.attributes";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToPostViewModelUtils } from "../mappers/map-to-post-view-model.utils";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { postsService } from "../../attributes/posts.service";
import { blogsService } from "../../../blogs/application/blogs.service";

export const createPostHandler = async (
    req: Request<{}, {}, PostAttributes>,
    res: Response
) => {
    try {
        // At first, we need to find the existing blog (to extract its name).
        const blog = await blogsService.findById(req.body.blogId);
        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'blogId' }]));
            return;
        }

        const createdPostId = await postsService.create(req.body, blog.name);
        const createdPost = await postsService.findById(createdPostId);
        if (!createdPost) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Post not found', field: 'id' }]));
            return;
        }

        const postViewModel = mapToPostViewModelUtils(createdPost);
        res.status(HttpStatus.Created_201).send(postViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
