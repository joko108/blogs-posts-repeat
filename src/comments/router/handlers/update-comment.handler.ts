import { Request, Response } from "express";
import { CommentAttributes } from "../../application/dto/comment.attributes";
import { commentsQueryRepository } from "../../repositories/comments.query.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { commentsService } from "../../application/comments.service";

export const updateCommentHandler = async (
    req: Request<{ id: string }, {}, CommentAttributes>,
    res: Response,
) => {
    try {
        // Check whether the comment exists.
        const comment = await commentsQueryRepository.findById(req.params.id);
        if (!comment) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Comment not found', field: 'id' }]));
            return;
        }

        await commentsService.update(req.params.id, req.body);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
