import { Express } from "express";
import { PostInputDto } from "../../../src/posts/attributes/dto/post.input.dto";
import { PostViewModel } from "../../../src/posts/types/post-view-model";
import { createBlog } from "../blogs/create-blog";
import { getPostDto } from "./get-post-dto";
import request from "supertest";
import { POSTS_PATH } from "../../../src/posts/constants/posts.paths";
import { generateBasicAuthToken } from "../generate-admin-auth-token";
import { HttpStatus } from "../../../src/core/types/http-statuses";

export const createPost = async (app: Express, postDto?: PostInputDto): Promise<PostViewModel> => {
    const blog = await createBlog(app);

    const defaultPostData = getPostDto(blog.id);

    const testPostData = { ...defaultPostData, ...postDto };

    const createdPost = await request(app)
        .post(POSTS_PATH)
        .set('Authorization', generateBasicAuthToken())
        .send(testPostData)
        .expect(HttpStatus.Created_201);

    return createdPost.body;
};
