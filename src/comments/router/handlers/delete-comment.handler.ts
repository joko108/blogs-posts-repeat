import { Request, Response } from "express";
import { commentsQueryRepository } from "../../repositories/comments.query.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { commentsService } from "../../application/comments.service";

export const deleteCommentHandler = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const comment = await commentsQueryRepository.findById(req.params.id);
        if (!comment) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Comment not found', field: 'id' }]));
            return;
        }

        await commentsService.delete(req.params.id);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
