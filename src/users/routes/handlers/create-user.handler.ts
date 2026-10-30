import { Request, Response } from "express";
import { UsersAttributes } from "../../application/dtos/users-attributes";
import { usersService } from "../../application/users.service";
import { HttpStatus } from "../../../core/types/http-statuses";
import { createErrorMessage } from "../../../core/middlewares/validation/input-validation-result.middleware";
import { mapToUserViewModel } from "../mappers/map-to-user-view-model";

export const createUserHandler = async (
    req: Request<{}, {}, UsersAttributes>,
    res: Response,
) => {
    try {
        const createdUserId = await usersService.create(req.body);

        const createdUser = await usersService.findById(createdUserId);
        if (!createdUser) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessage([{ message: 'User not found', field: 'id' }]));
            return;
        }

        const userViewModel = mapToUserViewModel(createdUser);
        res.status(HttpStatus.Created_201).send(userViewModel);

    } catch (error) {
        // Handle errors of unique.
        if (error instanceof Error) {
            if (error.message === 'Login already exists') {
                res
                    .status(HttpStatus.BadRequest_400)
                    .send(createErrorMessage([{ message: 'Login already exists', field: 'login' }]));
                return;
            }
            if (error.message === 'Email already exists') {
                res
                    .status(HttpStatus.BadRequest_400)
                    .send(createErrorMessage([{ message: 'Email already exists', field: 'email' }]));
                return;
            }
        }

        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
