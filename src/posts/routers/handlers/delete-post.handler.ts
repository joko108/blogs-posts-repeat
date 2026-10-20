import { Request, Response } from "express";
import { postsRepository } from "../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/validation/input-validation-result.middleware";

export const deletePostHandler = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const post = postsRepository.findById(req.params.id);
        if (!post) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Post not found', field: 'id' }]));
            return;
        }

        await postsRepository.delete(req.params.id);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.NoContent_204);
    }
};
