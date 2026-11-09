import { Comment } from "../../types/comment";
import { CommentViewModel } from "../../types/comment-view-model";
import { WithId } from "mongodb";

export const mapToCommentViewModelUtils = (comment: WithId<Comment>): CommentViewModel => {
    return {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.userId,
            userLogin: comment.userLogin,
        },
        createdAt: comment.createdAt,
    };
};
