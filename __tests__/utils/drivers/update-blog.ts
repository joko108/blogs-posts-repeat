import request from "supertest";
import { Express } from "express";
import { BlogsInputDto } from "../../../src/blogs/dto/blogs.input.dto";
import { getBlogDto } from "./get-blog-dto";
import { BLOGS_PATH } from "../../../src/blogs/constants/blogs.paths";
import { generateBasicAuthToken } from "../generate-admin-auth-token";
import { HttpStatus } from "../../../src/core/types/http-statuses";

export const updateBlog = async (
    app: Express,
    blogId: string,
    blogDto?: BlogsInputDto,
): Promise<void> => {

    const defaultBlog: BlogsInputDto = getBlogDto();
    const testBlogData = { ...defaultBlog, ...blogDto };

    // We don't need a constant, cause function return nothing.
    await request(app)
        .put(`${BLOGS_PATH}/${blogId}`)
        .set('Authorization', generateBasicAuthToken())
        .send(testBlogData)
        .expect(HttpStatus.NoContent_204);
};
