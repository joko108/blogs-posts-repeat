import { Request, Response } from "express";
import { IdType } from "../../../core/types/id";
import { HttpStatus } from "../../../core/types/http-statuses";
import { usersQueryRepository } from "../../../users/repositories/users.query.repository";
import { mapToMeViewModelUtils } from "../mappers/map-to-me-view-model.utils";

export const authGetHandler = async (req: Request<{}, {}, {}, {}, IdType>, res: Response) => {
    const userId = req.user?.id as string;
    if (!userId) {
        res.sendStatus(HttpStatus.Unauthorized_401);
        return;
    }

    const me = await usersQueryRepository.findById(userId);
    if (!me) {
        res.sendStatus(HttpStatus.Unauthorized_401);
        return;
    }

    const output = mapToMeViewModelUtils(me);

    res.status(HttpStatus.Ok_200).send(output);
};
