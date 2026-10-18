import { Request, Response } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { blogsRepository } from "../repositories/blogs.repository";
import { createErrorMessage } from "../../core/validation/input-validation-result.middleware";

export const getBlogHandler = (req: Request<{ id: string }>, res: Response) => {
    const blog = blogsRepository.findById(+req.params.id);

    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
        return;
    }

    res.status(HttpStatus.Ok_200).send(blog);
};
