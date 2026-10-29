import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { blogsService } from "../../application/blogs.service";

export const deleteBlogHandler = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const result = await blogsService.delete(req.params.id);
        if (result.status === 'not found') {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
