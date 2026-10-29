import { Request, Response } from "express";
import { PostAttributes } from "../../attributes/dto/post.attributes";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { postsService } from "../../attributes/posts.service";

export const updatePostHandler = async (
    req: Request<{ id: string }, {}, PostAttributes>,
    res: Response
) => {
    try {
        const post = await postsService.findById(req.params.id);
        if (!post) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Post not found', field: 'id' }]));
            return;
        }

        await postsService.update(req.params.id, req.body);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
