import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { blogsRepository } from "../../repositories/blogs.repository";
import { mapToBlogViewModelUtils } from "../mappers/map-to-blog-view-model.utils";

export const getBlogsListHandler = async (_req: Request, res: Response) => {
    try {
        const blogs = await blogsRepository.findAll();

        // Return the view-model to the client, not the raw document.
        const blogsViewModel = blogs.map(mapToBlogViewModelUtils);
        res.status(HttpStatus.Ok_200).send(blogsViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
