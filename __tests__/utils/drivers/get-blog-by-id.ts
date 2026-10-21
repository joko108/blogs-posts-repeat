import request from "supertest";
import { Express } from "express";
import { BlogViewModel } from "../../../src/blogs/types/blog-view-model";
import { BLOGS_PATH } from "../../../src/blogs/constants/blogs.paths";
import { HttpStatus } from "../../../src/core/types/http-statuses";

export const getBlogById = async (app: Express, blogId: string): Promise<BlogViewModel> => {
    const blog = await request(app)
        .get(`${BLOGS_PATH}/${blogId}`)
        .expect(HttpStatus.Ok_200);

    return blog.body;
};
