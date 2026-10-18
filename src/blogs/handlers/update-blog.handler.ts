import { Request, Response } from "express";
import { BlogsInputDto } from "../dto/blogs.input.dto";
import { HttpStatus } from "../../core/types/http-statuses";
import { blogsRepository } from "../repositories/blogs.repository";
import { createErrorMessage } from "../../core/validation/input-validation-result.middleware";

export const updateBlogHandler = (
    req: Request<{ id: string }, {}, BlogsInputDto>,
    res: Response
) => {
    const isUpdate = blogsRepository.update(req.params.id, req.body);

    if (!isUpdate) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
        return;
    }

    res.sendStatus(HttpStatus.NoContent_204);
};
