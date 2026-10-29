import { Express } from "express";
import { PostInputDto } from "../../../src/posts/attributes/dto/post.input.dto";
import { getPostDto } from "./get-post-dto";
import request from "supertest";
import { POSTS_PATH } from "../../../src/posts/constants/posts.paths";
import { generateBasicAuthToken } from "../generate-admin-auth-token";
import { HttpStatus } from "../../../src/core/types/http-statuses";

export const updatePost = async (
    app: Express,
    postId: string,
    blogId: string,
    postDto?: PostInputDto
): Promise<void> => {

    const defaultPost = getPostDto(blogId);

    const testUpdatedPostData = { ...defaultPost, ...postDto };

    await request(app)
        .put(`${POSTS_PATH}/${postId}`)
        .set('Authorization', generateBasicAuthToken())
        .send(testUpdatedPostData)
        .expect(HttpStatus.NoContent_204);
};
