import { Request, Response } from "express";
import { blogsRepository } from "../../repositories/blogs.repository";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";

export const deleteBlogHandler = async (
    req: Request<{ id: string }>,
    res: Response
) => {
    try {
        const blog = await blogsRepository.findById(req.params.id);
        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        await blogsRepository.delete(req.params.id);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
