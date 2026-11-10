import { Request, Response, NextFunction } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { jwtService } from "../adapters/jwt.service";
import { IdType } from "../../core/types/id";

export const accessTokenGuard = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) return res.sendStatus(HttpStatus.Unauthorized_401);

    // Extract Auth type and token.
    const [ authType, token ] = req.headers.authorization.split(' ');
    if (authType !== 'Bearer') return res.sendStatus(HttpStatus.Unauthorized_401);

    const payload = await jwtService.verifyToken(token);
    if (payload) {
        const { userId } = payload;

        // Create new property in request - 'user', to extract userId and use it later.
        req.user = { id: userId } as IdType;
        return next();
    }
    res.sendStatus(HttpStatus.Unauthorized_401);
    return;
};
