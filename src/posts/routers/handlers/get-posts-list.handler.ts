import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { postsRepository } from "../../repositories/posts.repository";
import { mapToPostViewModelUtils } from "../mappers/map-to-post-view-model.utils";

export const getPostsListHandler = async (_req: Request, res: Response) => {
    try {
        const posts = await postsRepository.findAll();

        // Return the view-model to the client, not the raw document.
        const postViewModel = posts.map(mapToPostViewModelUtils);
        res.status(HttpStatus.Ok_200).send(postViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
