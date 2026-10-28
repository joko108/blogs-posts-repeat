import { Request, Response } from "express";
import { PostInputDto } from "../../dto/post.input.dto";
import { postsRepository } from "../../repositories/posts.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";

export const updatePostHandler = async (
    req: Request<{ id: string }, {}, PostInputDto>,
    res: Response
) => {
    try {
        const post = await postsRepository.findById(req.params.id);
        if (!post) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Post not found', field: 'id' }]));
            return;
        }

        await postsRepository.update(req.params.id, req.body);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
