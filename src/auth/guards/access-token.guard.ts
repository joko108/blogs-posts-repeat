import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { jwtService } from "../adapters/jwt.service";
import { IdType } from "../../core/types/id";

export const accessTokenGuard = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return res.sendStatus(HttpStatus.Unauthorized_401);

    const [ authType, token ] = req.headers.authorization.split(' ');

    if (authType !== 'Bearer') return res.sendStatus(HttpStatus.Unauthorized_401);

    const payload = await jwtService.verifyToken(token);
    if (payload) {
        const { userId } = payload;

        req.user = { id: userId } as IdType;
        next();

        return ;
    }
    res.sendStatus(HttpStatus.Unauthorized_401);

    return;
};
