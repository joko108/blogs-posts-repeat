import { config } from 'dotenv';

config();

const env = process.env;

// Логин и пароль супер-админа (можно переопределить переменными окружения).
export const ADMIN_USERNAME = env.ADMIN_USERNAME || 'admin';
export const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'qwerty';

// Хранилище общих настроек.
export const SETTINGS = {
    PORT: env.PORT,
    MONGO_URL: env.MONGO_URL as string,
    DB_NAME: env.DB_NAME as string,
    AC_SECRET: env.AC_SECRET as string,
    AC_TIME: Number(env.AC_TIME),
};
