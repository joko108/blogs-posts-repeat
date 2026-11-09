import { Request, Response } from "express";
import { CommentsQueryInput } from "../input/comments-query.input";
import { postsService } from "../../../posts/attributes/posts.service";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { commentsQueryRepository } from "../../repositories/comments.query.repository";
import { mapToCommentsListViewModelUtils } from "../mappers/map-to-comments-list-view-model.utils";

export const getCommentsListsByPostIdHandler = async (
    req: Request<{ id: string }, {}, {}, CommentsQueryInput>,
    res: Response,
) => {
    try {
        const postId = req.params.id;
        const queryInput = req.query;

        const post = await postsService.findById(postId);
        if (!post) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Post not fond', field: 'id' }]));
            return;
        }

        const { items, totalCount } = await commentsQueryRepository.findManyByPostId(postId, queryInput);
        const output = mapToCommentsListViewModelUtils(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
        });

        res.status(HttpStatus.Ok_200).send(output);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
