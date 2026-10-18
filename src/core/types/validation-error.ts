// Одна ошибка валидации (какое поле не прошло и почему).
export type ValidationErrorType = {
    message: string,
    field: string,
};

// Единый формат сообщений об ошибке.
export type ValidationErrorDto = { errorMessages: ValidationErrorType[] };
