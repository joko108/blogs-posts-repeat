import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { postsService } from "../../attributes/posts.service";

export const deletePostHandler = async (
    req: Request<{ id: string }>,
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

        await postsService.delete(req.params.id);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
