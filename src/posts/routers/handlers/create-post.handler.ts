import { Request, Response } from "express";
import { PostInputDto } from "../../dto/post.input.dto";
import { Post } from "../../types/post";
import { postsRepository } from "../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { mapToPostViewModelUtils } from "../mappers/map-to-post-view-model.utils";
import { blogsRepository } from "../../../blogs/repositories/blogs.repository";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";

export const createPostHandler = async (
    req: Request<{}, {}, PostInputDto>,
    res: Response
) => {
    try {

        // At first, we need to find the existing blog (to extract its name).
        const blog = await blogsRepository.findById(req.body.blogId);
        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'blogId' }]));
            return;
        }

        // DTO -> domain model; 'blogName and 'cratedAt' adds here.
        const newPost: Post = {
            ...req.body,
            blogName: blog.name,
            createdAt: new Date(),
        };

        const createdPost = await postsRepository.create(newPost);
        const postViewModel = mapToPostViewModelUtils(createdPost);
        res.status(HttpStatus.Created_201).send(postViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
