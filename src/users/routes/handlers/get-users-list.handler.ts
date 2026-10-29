import { Request, Response } from "express";
import { UserQueryInput } from "../input/user-query.input";
import { usersService } from "../../application/users.service";
import { mapToUsersListViewModelUtils } from "../mappers/map-to-users-list-view-model.utils";
import { HttpStatus } from "../../../core/types/http-statuses";

export const getUsersListHandler = async (
    req: Request<{}, {}, {}, UserQueryInput>,
    res: Response
) => {
    try {
        const queryInput = req.query;
        const { items, totalCount } = await usersService.findMany(queryInput);

        const output = mapToUsersListViewModelUtils(items, {
            pageNumber: queryInput.pageNumber,
            pageSize: queryInput.pageSize,
            totalCount,
        });
        res.status(HttpStatus.Ok_200).send(output);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
