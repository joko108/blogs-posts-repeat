import express, { Express } from "express";
import { BLOGS_PATH } from "./blogs/constants/blogs.paths";
import { blogsRouter } from "./blogs/routers/blogs.router";
import { TESTING_PATH } from "./testing/constants/testing.paths";
import { testingRouter } from "./testing/router/testing.router";
import { POSTS_PATH } from "./posts/constants/posts.paths";
import { postsRouter } from "./posts/routers/posts.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.use(BLOGS_PATH, blogsRouter);
    app.use(POSTS_PATH, postsRouter);
    app.use(TESTING_PATH, testingRouter);
};
