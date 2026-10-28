import { WithId } from "mongodb";
import { Blog } from "../../types/blog";
import { BlogsListViewModel } from "../../types/blogs-list-view-model";
import { mapToBlogViewModelUtils } from "./map-to-blog-view-model.utils";

// Transform list of blogs from database to view-model for the answer via API.
export const mapToBlogsListViewModelUtils = (
    items: WithId<Blog>[],
    meta: { pageNumber: number, pageSize: number, totalCount: number }
): BlogsListViewModel => {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: items.map(mapToBlogViewModelUtils),
    };
};
