import { Request, Response } from "express";
import { BlogsAttributes } from "../../application/dtos/blogs-attributes";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";

export const updateBlogHandler = async (
    req: Request<{ id: string }, {}, BlogsAttributes>,
    res: Response
) => {
    try {
        const blog = await blogsRepository.findById(req.params.id);

        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        await blogsRepository.update(req.params.id, req.body);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
