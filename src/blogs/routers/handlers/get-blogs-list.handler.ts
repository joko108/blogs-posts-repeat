import { Request, Response } from "express";
import { BlogQueryInput } from "../input/blog-query.input";
import { blogsRepository } from "../../repositories/blogs.repository";
import { mapToBlogsListViewModelUtils } from "../mappers/map-to-blogs-list-view-model.utils";
import { HttpStatus } from "../../../core/types/http-statuses";

export const getBlogsListHandler = async (
    req: Request<{}, {}, {}, BlogQueryInput>,
    res: Response
) => {
    try {
        const queryInput = req.query;
        const { items, totalCount } = await blogsRepository.findMany(queryInput);

        const output = mapToBlogsListViewModelUtils(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
        });

        res.status(HttpStatus.Ok_200).send(output);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
