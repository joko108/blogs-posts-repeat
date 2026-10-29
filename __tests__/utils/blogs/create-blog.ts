import request from "supertest";
import { Express } from "express";
import { BlogsAttributes } from "../../../src/blogs/application/dtos/blogs-attributes";
import { BlogViewModel } from "../../../src/blogs/types/blog-view-model";
import { getBlogDto } from "./get-blog-dto";
import { BLOGS_PATH } from "../../../src/blogs/constants/blogs.paths";
import { generateBasicAuthToken } from "../generate-admin-auth-token";
import { HttpStatus } from "../../../src/core/types/http-statuses";

export const createBlog = async (app: Express, blogDto?: BlogsAttributes): Promise<BlogViewModel> => {

    const defaultBlog: BlogsAttributes = getBlogDto();
    const testBlogData = { ...defaultBlog, ...blogDto };

    const createBlogResponse = await request(app)
        .post(BLOGS_PATH)
        .set('Authorization', generateBasicAuthToken())
        .send(testBlogData)
        .expect(HttpStatus.Created_201);

    return createBlogResponse.body;
};
