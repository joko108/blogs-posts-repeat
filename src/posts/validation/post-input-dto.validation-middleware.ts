import { body } from "express-validator";

const titleValidation = body('title')
    .exists()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string')
    .trim()
    .isLength({ min: 1, max: 30 })
    .withMessage('Invalid length of title');

const shortDescriptionValidation = body('shortDescription')
    .exists()
    .withMessage('Short description is required')
    .isString()
    .withMessage('Short description must be a string')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Invalid length of short description');

const contentValidation = body('content')
    .exists()
    .withMessage('Content is required')
    .isString()
    .withMessage('Content must be a string')
    .trim()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Invalid length of content');

const blogIdValidation = body('blogId')
    .exists()
    .withMessage('Blog ID is required')
    .isString()
    .withMessage('Blog ID must be a string')
    .isMongoId()
    .withMessage('Blog ID must be a MongoId type');

export const postInputDtoValidationMiddleware = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
];

// For endpoint '/blogs/:blogId/posts', blogId taken from URL params.
export const postInputDtoWithoutBlogIdValidationMiddleware = [
    titleValidation,
    shortDescriptionValidation,
    contentValidation,
];
