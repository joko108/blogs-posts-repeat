import request from "supertest";
import express from "express";
import { setupApp } from "../../../src/setup-app";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { POSTS_PATH } from "../../../src/posts/constants/posts.paths";
import { runDB, stopDb } from "../../../src/db/mongo.db";
import { clearDb } from "../../utils/clear-db";
import { SETTINGS } from "../../../src/settings/config";
import { createPost } from "../../utils/posts/create-post";
import { PostInputDto } from "../../../src/posts/dto/post.input.dto";
import { updatePost } from "../../utils/posts/update-post";
import { getPostById } from "../../utils/posts/get-post-by-id";
import { generateBasicAuthToken } from "../../utils/generate-admin-auth-token";

describe('Posts API Tests', () => {
    const app = express();
    setupApp(app);

    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL);
        await clearDb(app);
    });

    afterAll(async () => {
        await stopDb();
    });

    it(`✅should create post when correct body passed; POST /posts`, async () => {
        await createPost(app);
    });

    it(`✅should return posts list; GET /posts`, async () => {
        await createPost(app);

        const getCreatedPostsListResponse = await request(app)
            .get(POSTS_PATH)
            .expect(HttpStatus.Ok_200);

        expect(getCreatedPostsListResponse.body).toBeInstanceOf(Array);
        expect(getCreatedPostsListResponse.body).toHaveLength(2);
    });

    it(`✅should return post by id; GET /posts/:id`, async () => {
        const createdPost = await createPost(app);

        const getCreatedPostResponse = await getPostById(app, createdPost.id);

        expect(getCreatedPostResponse).toBeInstanceOf(Object);
        expect(getCreatedPostResponse).toEqual({
            ...createdPost,
            id: expect.any(String),
            blogName: expect.any(String),
            createdAt: expect.any(String),
        });
    });

    it(`✅should update existing post by id; PUT /posts/:id`, async () => {
        const createdPost = await createPost(app);

        const updateDataSet: PostInputDto = {
            title: 'new post',
            shortDescription: 'some description',
            content: 'super content',
            blogId: createdPost.blogId,
        };

        await updatePost(app, createdPost.id, createdPost.blogId, updateDataSet);

        const getUpdatedPostResponse = await getPostById(app, createdPost.id);

        expect(getUpdatedPostResponse).toEqual({
            id: createdPost.id,
            title: updateDataSet.title,
            shortDescription: updateDataSet.shortDescription,
            content: updateDataSet.content,
            blogId: updateDataSet.blogId,
            blogName: createdPost.blogName,
            createdAt: createdPost.createdAt,
        });
    });

    it(`✅should delete existing post by id; DELETE /posts/:id`, async () => {
        const createdPost = await createPost(app);

        await request(app)
            .delete(`${POSTS_PATH}/${createdPost.id}`)
            .set('Authorization', generateBasicAuthToken())
            .expect(HttpStatus.NoContent_204);

        await request(app)
            .get(`${POSTS_PATH}/${createdPost.id}`)
            .expect(HttpStatus.NotFound_404);
    });
});
