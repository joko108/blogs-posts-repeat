import request from "supertest";
import express from "express";
import { setupApp } from "../../../src/setup-app";
import { BlogsInputDto } from "../../../src/blogs/dto/blogs.input.dto";
import { TESTING_PATH, TESTING_ROUTES } from "../../../src/testing/constants/testing.paths";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { BLOGS_PATH } from "../../../src/blogs/constants/blogs.paths";

describe('Blogs API Tests', () => {
    const app = express();
    setupApp(app);

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

    it(`✅Should create blog when correct body passed; POST /blogs`, async () => {
        const getNewBlog: BlogsInputDto = {
            ...testBlogData,
            name: 'Valentin blog',
            description: 'Just my own blog',
            websiteUrl: 'https://valentin.blog.com',
        };

        await request(app)
            .post(BLOGS_PATH)
            .send(getNewBlog)
            .expect(HttpStatus.Created_201);
    });

    it(`✅should return blogs list; GET /blogs`, async () => {
        await request(app)
            .post(BLOGS_PATH)
            .send({ ...testBlogData, name: 'Another blog1' })
            .expect(HttpStatus.Created_201);

        await request(app)
            .post(BLOGS_PATH)
            .send({ ...testBlogData, name: 'Another blog2' })
            .expect(HttpStatus.Created_201);

        const getBlogsListResponse = await request(app).get(BLOGS_PATH).expect(HttpStatus.Ok_200);

        expect(getBlogsListResponse.body).toBeInstanceOf(Array);
        expect(getBlogsListResponse.body.length).toBeGreaterThanOrEqual(2);
    });

    it(`✅should return blog by id; GET /blogs/:id`, async () => {
        const createdBlog = await request(app)
            .post(BLOGS_PATH)
            .send({ ...testBlogData, name: 'Another blog' })
            .expect(HttpStatus.Created_201);

        const getBlogResponse = await request(app)
            .get(`${BLOGS_PATH}/${createdBlog.body.id}`).expect(HttpStatus.Ok_200);

        expect(getBlogResponse.body).toBeInstanceOf(Object);

        expect(getBlogResponse.body).toEqual({
            ...createdBlog.body,
            id: expect.any(String),
        });
    });

    it(`✅should update blog by id when correct body passed; PUT /blogs/:id`, async () => {
        const createdBlog = await request(app)
            .post(BLOGS_PATH)
            .send({ ...testBlogData, name: 'Another blog' })
            .expect(HttpStatus.Created_201);

        const updateBlogData = {
            name: 'Ann',
            description: 'Some description',
            websiteUrl: 'https://ann.superblog.com',
        };

        await request(app)
            .put(`${BLOGS_PATH}/${createdBlog.body.id}`)
            .send(updateBlogData)
            .expect(HttpStatus.NoContent_204);

        const getUpdatedBlog = await request(app).get(`${BLOGS_PATH}/${createdBlog.body.id}`);

        expect(getUpdatedBlog.body).toEqual({
            ...updateBlogData,
            id: createdBlog.body.id,
        });
    });

    it(`✅should delete blog by id; DELETE /blogs/:id`, async () => {
        const createdBlog = await request(app)
            .post(BLOGS_PATH)
            .send({ ...testBlogData, name: 'Another blog' })
            .expect(HttpStatus.Created_201);

        await request(app)
            .delete(`${BLOGS_PATH}/${createdBlog.body.id}`)
            .expect(HttpStatus.NoContent_204);

        await request(app)
            .get(`${BLOGS_PATH}/${createdBlog.body.id}`)
            .expect(HttpStatus.NotFound_404);
    });
});
