const env = process.env;

// Логин и пароль супер-админа (можно переопределить переменными окружения).
export const ADMIN_USERNAME = env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'qwerty';

// Хранилище общих настроек.
export const SETTINGS = {
    PORT: env.PORT || 3000,
    MONGO_URL: env.MONGO_URL || 'mongodb://127.0.0.1:27017',
    DB_NAME: env.DB_NAME || 'blogs-posts-s01-w04',
};
