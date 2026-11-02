import { Request, Response } from "express";
import { LoginDto } from "../../types/login.dto";
import { authService } from "../../application/auth.service";
import { HttpStatus } from "../../../core/types/http-statuses";

export const authHandler = async (req: Request<{}, {}, LoginDto>, res: Response) => {
    const { loginOrEmail, password } = req.body;
    const accessToken = await authService.loginUser(loginOrEmail, password);
    if (!accessToken) return res.sendStatus(HttpStatus.Unathorized_401);

    return res.sendStatus(HttpStatus.NoContent_204);
};
