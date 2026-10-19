import { Request, Response, NextFunction } from "express";
import { ValidationErrorType, ValidationErrorDto } from "../types/validation-error";
import { ValidationError, validationResult } from "express-validator";
import { HttpStatus } from "../types/http-statuses";

// Оборачивает список ошибок в единый формат: { message: ..., field: ... }.
export const createErrorMessage = (
    error: ValidationErrorType[]
): ValidationErrorDto => {
    return { errorsMessages: error};
};

// Хелпер, преобразовывающий ошибки express-validatr'а к нужному нам формату.
const formatError = (error: ValidationError): ValidationErrorType => {
    if (error.type === 'field') {
        return { message: error.msg, field: error.path };
    }
    // Прочие ошибки.
    return { message: error.msg, field: ''};
};

// middleware обрабатывает сырые ошибки express-validatr'а
// и направляет их в хелпер formatError().
export const inputValidationResultMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req)
        .formatWith(formatError)
        .array({ onlyFirstError: true });

    if (errors.length > 0) {
        res.status(HttpStatus.BadRequest_400).json({ errorsMessages: errors });
        return;
    }

    next();
};
