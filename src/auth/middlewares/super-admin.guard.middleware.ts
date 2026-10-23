import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { ADMIN_PASSWORD, ADMIN_USERNAME } from "../../settings/config";

// Basic Auth: it passed only requests with correct login and password of super-admin.
export const superAdminGuardMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const auth = req.headers['authorization'] as string;  // 'Basic xxxxx'

    if (!auth) {
        res.sendStatus(HttpStatus.Unathorized_401);
        return;
    }

    const [authType, token] = auth.split(' ');

    if (authType !== 'Basic') {
        res.sendStatus(HttpStatus.Unathorized_401);
        return;
    }

    // Decode base64, split login and password.
    const credentials = Buffer.from(token, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
        res.sendStatus(HttpStatus.Unathorized_401);
        return;
    }

    next();
};
