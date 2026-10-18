import { Request, Response } from "express";
import { blogsRepository } from "../repositories/blogs.repository";
import { HttpStatus } from "../../core/types/http-statuses";
import { createErrorMessage } from "../../core/validation/input-validation-result.middleware";

export const deleteBlogHandler = (
    req: Request<{ id: string }>,
    res: Response
) => {
    const isDeleted = blogsRepository.delete(req.params.id);

    if (!isDeleted) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
        return;
    }

    res.sendStatus(HttpStatus.NoContent_204);
};
