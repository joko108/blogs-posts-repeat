import express, { Express } from "express";
import {BLOGS_PATH} from "./blogs/constants/blogs.paths";
import {blogsRouter} from "./blogs/routers/blogs.router";

export const setupApp = (app: Express) => {
    app.use(express.json());

    app.use(BLOGS_PATH, blogsRouter);

};
