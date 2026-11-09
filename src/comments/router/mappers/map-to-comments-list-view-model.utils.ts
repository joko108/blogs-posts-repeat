import { WithId } from "mongodb";
import { Comment } from "../../types/comment";
import { CommentsListViewModel } from "../../types/comments-list-view-model";
import { mapToCommentViewModelUtils } from "./map-to-comment-view-model.utils";

export const mapToCommentsListViewModelUtils = (
    items: WithId<Comment>[],
    meta: { pageNumber: number, pageSize: number, totalCount: number },
): CommentsListViewModel => {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: items.map(mapToCommentViewModelUtils),
    };
};
