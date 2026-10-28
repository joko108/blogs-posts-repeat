import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import { PostsForBlogQueryInput } from "../input/post-query.input";
import { mapToPostsListViewModelUtils } from "../mappers/map-to-posts-list-view-model.utils";

export const getPostsListHandler = async (
    req: Request<{}, {}, {}, PostsForBlogQueryInput>,
    res: Response
) => {
    try {
        const queryInput = req.query;
        const { items, totalCount } = await postsRepository.findMany(queryInput);

        // Return the view-model to the client, not the raw document.
        const output = mapToPostsListViewModelUtils(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
        });
        res.status(HttpStatus.Ok_200).send(output);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
