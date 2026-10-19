import request from "supertest";
import express from "express";
import { setupApp } from "../../../src/setup-app";
import { PostInputDto } from "../../../src/posts/dto/post.input.dto";
import { BlogsInputDto } from "../../../src/blogs/dto/blogs.input.dto";
import { TESTING_PATH, TESTING_ROUTES } from "../../../src/testing/constants/testing.paths";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { POSTS_PATH } from "../../../src/posts/constants/posts.paths";
import { BLOGS_PATH } from "../../../src/blogs/constants/blogs.paths";

describe('Posts API Tests', () => {
    const app = express();
    setupApp(app);

    // Для создания поста нужен существующий блог, чтоб извлечь blogId и blogName.
    const testBlogData: BlogsInputDto = {
        name: 'Valentin blog',
        description: 'Just my own blog',
        websiteUrl: 'https://valentin.blog.com',
    };

    beforeAll(async () => {
        await request(app)
            .delete(`${TESTING_PATH}${TESTING_ROUTES.ALL_DATA}`)
            .expect(HttpStatus.NoContent_204);
    });

    it(`✅should create post when correct body passed; POST /posts`, async () => {
        const createdBlog = await request(app)
            .post(BLOGS_PATH)
            .send(testBlogData)
            .expect(HttpStatus.Created_201);

        const testPostData: PostInputDto = {
            title: 'new post',
            shortDescription: 'some description',
            content: 'super content',
            blogId: createdBlog.body.id,
        };

        await request(app)
            .post(POSTS_PATH)
            .send(testPostData)
            .expect(HttpStatus.Created_201);
    });

    it(`✅should return posts list; GET /posts`, async () => {
        const createdBlog = await request(app)
            .post(BLOGS_PATH)
            .send(testBlogData)
            .expect(HttpStatus.Created_201);

        const testPostData: PostInputDto = {
            title: 'new post2',
            shortDescription: 'some description',
            content: 'just content',
            blogId: createdBlog.body.id,
        };

        await request(app)
            .post(POSTS_PATH)
            .send(testPostData)
            .expect(HttpStatus.Created_201);

        const getPostsListResponse = await request(app)
            .get(POSTS_PATH)
            .expect(HttpStatus.Ok_200);

        expect(getPostsListResponse.body).toBeInstanceOf(Array);
        expect(getPostsListResponse.body).toHaveLength(2);
    });

    it(`✅should return post by id; GET /posts/:id`, async () => {
        const createdBlog = await request(app)
            .post(BLOGS_PATH)
            .send(testBlogData)
            .expect(HttpStatus.Created_201);

        const testPostData: PostInputDto = {
            title: 'new post3',
            shortDescription: 'description',
            content: 'content',
            blogId: createdBlog.body.id,
        };

        const createdPost = await request(app)
            .post(POSTS_PATH)
            .send(testPostData)
            .expect(HttpStatus.Created_201);

        const getPostResponse = await request(app)
            .get(`${POSTS_PATH}/${createdPost.body.id}`)
            .expect(HttpStatus.Ok_200);

        expect(getPostResponse.body).toBeInstanceOf(Object);
        expect(getPostResponse.body).toEqual({
            ...createdPost.body,
            id: expect.any(String)
        });
    });

    it(`✅should update post when correct body passed; PUT /posts/:id`, async () => {
        const createdBlog = await request(app)
            .post(BLOGS_PATH)
            .send(testBlogData)
            .expect(HttpStatus.Created_201);

        const testPostData: PostInputDto = {
            title: 'new post4',
            shortDescription: 'description',
            content: 'content',
            blogId: createdBlog.body.id,
        };

        const createdPost = await request(app)
            .post(POSTS_PATH)
            .send(testPostData)
            .expect(HttpStatus.Created_201);

        const updateDataSet = {
            title: 'updated post',
            shortDescription: 'updated description',
            content: 'updated content',
            blogId: createdBlog.body.id,
        };

        await request(app)
            .put(`${POSTS_PATH}/${createdPost.body.id}`)
            .send(updateDataSet)
            .expect(HttpStatus.NoContent_204);

        const getPostResponse = await request(app)
            .get(`${POSTS_PATH}/${createdPost.body.id}`)
            .expect(HttpStatus.Ok_200);

        expect(getPostResponse.body).toBeInstanceOf(Object);
        expect(getPostResponse.body).toEqual({
            ...updateDataSet,
            id: createdPost.body.id,
            blogName: createdBlog.body.name,
        });
    });

    it(`✅should delete post by id; DELETE /posts/:id`, async () => {
        const createdBlog = await request(app)
            .post(BLOGS_PATH)
            .send(testBlogData)
            .expect(HttpStatus.Created_201);

        const testPostData: PostInputDto = {
            title: 'new post4',
            shortDescription: 'description',
            content: 'content',
            blogId: createdBlog.body.id,
        };

        const createdPost = await request(app)
            .post(POSTS_PATH)
            .send(testPostData)
            .expect(HttpStatus.Created_201);

        await request(app)
            .delete(`${POSTS_PATH}/${createdPost.body.id}`)
            .expect(HttpStatus.NoContent_204);

        await request(app)
            .get(`${POSTS_PATH}/${createdPost.body.id}`)
            .expect(HttpStatus.NotFound_404);
    });
});