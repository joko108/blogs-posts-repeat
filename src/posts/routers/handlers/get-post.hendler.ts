import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { mapToPostViewModelUtils } from "../mappers/map-to-post-view-model.utils";
import { postsService } from "../../attributes/posts.service";

export const getPostHandler = async (req: Request<{id: string}>, res: Response) => {
    try {
        const post = await postsService.findById(req.params.id);

        if (!post) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Post not found', field: 'id' }]));
            return;
        }


        const postViewModel = mapToPostViewModelUtils(post);
        res.status(HttpStatus.Ok_200).send(postViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
