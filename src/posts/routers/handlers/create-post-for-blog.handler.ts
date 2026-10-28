import { PostForBlogInputDto } from "../../dto/post-for-blog.input.dto";
import { Request,Response } from "express";
import {blogsRepository} from "../../../blogs/repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessage} from "../../../core/middlewares/validation/input-validation-result.middleware";
import {Post} from "../../types/post";
import {postsRepository} from "../../repositories/posts.repository";
import {mapToPostViewModelUtils} from "../mappers/map-to-post-view-model.utils";

export const createPostForBlogHandler = async (
    req: Request<{ blogId: string }, {}, PostForBlogInputDto>,
    res: Response
) => {
    try {
        const blogId = req.params.blogId;

        // Check whether the blog exists.
        const blog = await blogsRepository.findById(blogId);
        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        const newPost: Post = {
            ...req.body,
            blogId: blogId,  // Add blog's ID.
            blogName: blog.name,
            createdAt: new Date(),
        };

        const createPost = await postsRepository.create(newPost);
        const postViewModel = mapToPostViewModelUtils(createPost);
        res.status(HttpStatus.Created_201).send(postViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
