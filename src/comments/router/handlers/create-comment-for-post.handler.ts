import { Request, Response } from "express";
import { CommentAttributes } from "../../application/dto/comment.attributes";
import { usersRepository } from "../../../users/repositories/users.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { postsService } from "../../../posts/attributes/posts.service";
import { commentsService } from "../../application/comments.service";
import { commentsQueryRepository } from "../../repositories/comments.query.repository";
import { mapToCommentViewModelUtils } from "../mappers/map-to-comment-view-model.utils";

export const createCommentForPostHandler = async (
    req: Request<{ postId: string }, {}, CommentAttributes>,
    res: Response,
) => {
    try {
        // Check whether the post exists.
        const post = await postsService.findById(req.params.postId);
        if (!post) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Post not found', field: 'id' }]));
            return;
        }

        // Check whether the user exists and extract userId and userLogin.
        const user = await usersRepository.findById(req.user!.id);
        if (!user) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'User not found', field: 'id' }]));
            return;
        }

        // Pass dto, userId, postId and userLogin to the service.
        const createCommentId = await commentsService.create(
            req.body,
            req.params.postId,
            user._id.toString(),
            user.login
        );

        const createComment = await commentsQueryRepository.findById(createCommentId);
        if (!createComment) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Comment not found', field: 'id' }]));
            return;
        }

        const commentViewModel = mapToCommentViewModelUtils(createComment);
        res.status(HttpStatus.Created_201).send(commentViewModel);

    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
