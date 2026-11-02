import { body } from "express-validator";

export const passwordValidation = body('password')
    .exists()
    .withMessage('Password is required')
    .isString()
    .withMessage('Password must be a string')
    .trim()
    .isLength({ min: 6, max: 20 })
    .withMessage('Password in not correct');