import { PostForBlogAttributes } from "../../attributes/dto/post-for-blog.attributes";
import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { mapToPostViewModelUtils } from "../mappers/map-to-post-view-model.utils";
import { blogsService } from "../../../blogs/application/blogs.service";
import { postsService } from "../../attributes/posts.service";

export const createPostForBlogHandler = async (
    req: Request<{ blogId: string }, {}, PostForBlogAttributes>,
    res: Response
) => {
    try {
        const blogId = req.params.blogId;

        // Check whether the blog exists.
        const blog = await blogsService.findById(blogId);
        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        const createPostId = await postsService.createPostForBlog(req.body, blogId, blog.name);
        const createdPost = await postsService.findById(createPostId);
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
