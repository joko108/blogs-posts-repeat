import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { mapToBlogViewModelUtils } from "../mappers/map-to-blog-view-model.utils";
import { blogsService } from "../../application/blogs.service";

export const getBlogHandler = async (req: Request<{ id: string }>, res: Response) => {
    try {
        const blog = await blogsService.findById(req.params.id);

        // If blog by id not found.
        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'Blog not found', field: 'id' }]));
            return;
        }

        // Return the view-model to the client, not the raw document.
        const driverViewModel = mapToBlogViewModelUtils(blog);
        res.status(HttpStatus.Ok_200).send(driverViewModel);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
