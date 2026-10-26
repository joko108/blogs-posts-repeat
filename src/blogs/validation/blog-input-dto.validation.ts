import { body } from "express-validator";

// Validation of fields received from the client (from POST and PUT requests).
const nameValidation = body('name')
    .exists()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name should be a string')
    .trim()
    .isLength({ min: 2, max: 15 })
    .withMessage('Invalid length of name');

const descriptionValidation = body('description')
    .exists()
    .withMessage('Description is required')
    .isString()
    .withMessage('Description should be a string')
    .trim()
    .isLength({ min: 4, max: 500 })
    .withMessage('Invalid length of description');

const websiteValidation = body('websiteUrl')
    .exists()
    .withMessage('Website is required')
    .isString()
    .withMessage('Website should be a string')
    .trim()
    .isLength({ min: 12, max: 500 })
    .withMessage('Invalid length of Website')
    .isURL()
    .withMessage('Website name should be URL type');

export const blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteValidation,
];
