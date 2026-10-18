import { param } from "express-validator";

export const idValidation = param('id')
    .exists()
    .withMessage('ID is required')
    .isString()
    .withMessage('ID must be a string')
    .isNumeric()
    .withMessage('ID should be a numeric type');
