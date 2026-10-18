import { Request, Response } from "express";
import { PostInputDto } from "../dto/post.input.dto";
import { postsRepository } from "../repositories/posts.repository";
import { HttpStatus } from "../../core/types/http-statuses";
import { createErrorMessage } from "../../core/validation/input-validation-result.middleware";

export const updatePostHandler = (
    req: Request<{ id: string }, {}, PostInputDto>,
    res: Response
) => {
    const isUpdated = postsRepository.update(req.params.id, req.body);

    if (!isUpdated) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessage([{ message: 'Post not found', field: 'id' }]));
        return;
    }

    res.sendStatus(HttpStatus.NoContent_204);
};
