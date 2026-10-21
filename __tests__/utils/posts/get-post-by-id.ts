import { PostViewModel } from "../../../src/posts/types/post-view-model";
import { Express } from "express";
import request from "supertest";
import { POSTS_PATH } from "../../../src/posts/constants/posts.paths";
import { HttpStatus } from "../../../src/core/types/http-statuses";

export const getPostById = async (app: Express, postId: string): Promise<PostViewModel> => {
    const post = await request(app)
        .get(`${POSTS_PATH}/${postId}`)
        .expect(HttpStatus.Ok_200);

    return post.body;
};
