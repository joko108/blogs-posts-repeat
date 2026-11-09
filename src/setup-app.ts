import express, { Express, Request, Response } from "express";
import { BLOGS_PATH } from "./blogs/constants/blogs.paths";
import { blogsRouter } from "./blogs/routers/blogs.router";
import { TESTING_PATH } from "./testing/constants/testing.paths";
import { testingRouter } from "./testing/router/testing.router";
import { POSTS_PATH } from "./posts/constants/posts.paths";
import { postsRouter } from "./posts/routers/posts.router";
import { HttpStatus } from "./core/types/http-statuses";
import { USERS_PATH } from "./users/constants/user.paths";
import { usersRouter } from "./users/routes/users.router";
import { AUTH_PATH } from "./auth/constants/auth.path";
import { authRouter } from "./auth/routers/auth.router";
import { COMMENTS_PATH } from "./comments/constants/comments.paths";
import { commentsRouter } from "./comments/router/comments.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    // Health-check.
    app.get('/', (_req: Request, res: Response) => {
        res.status(HttpStatus.Ok_200).send('Server is up!');
    });

    // Every module connect to own base endpoint.
    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(USERS_PATH, usersRouter);
    app.use(COMMENTS_PATH, commentsRouter);
    app.use(AUTH_PATH, authRouter);

    app.use(TESTING_PATH, testingRouter);
};
