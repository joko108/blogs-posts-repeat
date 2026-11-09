import { body } from "express-validator";

export const contentValidation = body('content')
    .exists()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content must be a string')
    .isLength({ min: 20, max: 300 })
    .withMessage('Invalid length of content');
