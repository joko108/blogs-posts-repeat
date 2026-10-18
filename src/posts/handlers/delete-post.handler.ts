import { Request, Response } from "express";
import { postsRepository } from "../repositories/posts.repository";
import { HttpStatus } from "../../core/types/http-statuses";
import { createErrorMessage } from "../../core/validation/input-validation-result.middleware";

export const deletePostHandler = (
    req: Request<{ id: string }>,
    res: Response
) => {
    const isDeleted = postsRepository.delete(req.params.id);

    if (!isDeleted) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessage([{ message: 'Post not found', field: 'id' }]));
        return;
    }

    res.sendStatus(HttpStatus.NoContent_204);
};
