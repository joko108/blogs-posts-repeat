import { Request, Response } from "express";
import { LoginDto } from "../../types/login.dto";
import { authService } from "../../application/auth.service";
import { HttpStatus } from "../../../core/types/http-statuses";

export const authPostHandler = async (
    req: Request<{}, {}, LoginDto>,
    res: Response
) => {
    const { loginOrEmail, password } = req.body;

    const result = await authService.loginUser(loginOrEmail, password);
    if (!result) return res.sendStatus(HttpStatus.Unauthorized_401);

    return res.status(HttpStatus.Ok_200).send({ accessToken: result.accessToken });
};
