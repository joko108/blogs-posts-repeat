import { Request, Response } from "express";
import { commentsQueryRepository } from "../../repositories/comments.query.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { mapToCommentViewModelUtils } from "../mappers/map-to-comment-view-model.utils";

export const getCommentHandler = async (
    req: Request<{ commentId: string }>, res: Response
) => {
    try {
        const comment = await commentsQueryRepository.findById(req.params.commentId);
        if (!comment) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Comment not found', field: 'id' }]));
            return;
        }

        const commentViewModel = mapToCommentViewModelUtils(comment);
        res.status(HttpStatus.Ok_200).send(commentViewModel);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
