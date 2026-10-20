import { Request, Response } from "express";
import { BlogsInputDto } from "../../dto/blogs.input.dto";
import { Blog } from "../../types/blog";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";
import { mapToBlogViewModelUtils } from "../mappers/map-to-blog-view-model.utils";

export const createBlogHandler = async (
    req: Request<{}, {}, BlogsInputDto>,
    res: Response
) => {
    try {
        // DTO -> domain model; 'cratedAt' and 'isMembership' adds here.
        const newBlog: Blog = {
            ...req.body,
            createdAt: new Date(),
            isMembership: false,
        };

        const createdBlog = await blogsRepository.create(newBlog);
        const blogViewModel = mapToBlogViewModelUtils(createdBlog);  // Mapping to view-model.
        res.status(HttpStatus.Created_201).send(blogViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500)
    }
};
