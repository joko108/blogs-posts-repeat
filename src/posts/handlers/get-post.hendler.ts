import { Request, Response } from "express";
import { postsRepository } from "../repositories/posts.repository";
import { HttpStatus } from "../../core/types/http-statuses";
import { createErrorMessage } from "../../core/validation/input-validation-result.middleware";

export const getPostHendler = (req: Request<{id: string}>, res: Response) => {
    const post = postsRepository.findById(req.params.id);

    if (!post) {
        res
            .status(HttpStatus.NotFound_404)
            .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
        return;
    }

    res.status(HttpStatus.Ok_200).send(post);
};
