import { Request, Response } from "express";
import { BlogsInputDto } from "../dto/blogs.input.dto";
import { Blog } from "../types/blog";
import { HttpStatus } from "../../core/types/http-statuses";
import { blogsRepository } from "../repositories/blogs.repository";

export const createBlogHandler = (req: Request<{}, {}, BlogsInputDto>, res: Response) => {

    const newBlog: Omit<Blog, 'id'> = {
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
    };

    const createdBlog = blogsRepository.create(newBlog);
    res.status(HttpStatus.Created_201).send(createdBlog);
};
