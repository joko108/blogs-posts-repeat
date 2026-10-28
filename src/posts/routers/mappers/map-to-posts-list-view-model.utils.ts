import { WithId} from "mongodb";
import { Post } from "../../types/post";
import { PostsListViewModel } from "../../types/posts-list-view-model";
import { mapToPostViewModelUtils } from "./map-to-post-view-model.utils";

export const mapToPostsListViewModelUtils = (
    items: WithId<Post>[],
    meta: { pageNumber: number, pageSize: number, totalCount: number}
): PostsListViewModel => {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: items.map(mapToPostViewModelUtils),
    };
};
