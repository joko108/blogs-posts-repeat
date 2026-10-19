import request from "supertest";
import express from "express";
import { setupApp } from "../../../src/setup-app";
import { BlogsInputDto } from "../../../src/blogs/dto/blogs.input.dto";
import { TESTING_PATH, TESTING_ROUTES } from "../../../src/testing/constants/testing.paths";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { BLOGS_PATH } from "../../../src/blogs/constants/blogs.paths";

describe('Blogs body validation tests', () => {
    const app = express();
    setupApp(app);

    const correctBlogData: BlogsInputDto = {
        name: 'Valentin blog',
        description: 'Just my own blog',
        websiteUrl: 'https://valentin.blog.com',
    };

    beforeAll(async () => {
        await request(app)
            .delete(`${TESTING_PATH}${TESTING_ROUTES.ALL_DATA}`)
            .expect(HttpStatus.NoContent_204);
    });

    it(`❌shouldn't create blog when incorrect body passed; POST /blogs`, async () => {
        const getNewBlog1 = await request(app)
            .post(BLOGS_PATH)
            .send({
                ...correctBlogData,
                name: '   ',
                description: '   ',
                websiteUrl: '   ',
            })
            .expect(HttpStatus.BadRequest_400);

        expect(getNewBlog1.body.errorsMessages).toBeInstanceOf(Array);
        expect(getNewBlog1.body.errorsMessages).toHaveLength(3);

        const getNewBlog2 = await request(app)
            .post(BLOGS_PATH)
            .send({
                ...correctBlogData,
                name: '',
                description: '',
                websiteUrl: 'Just site',
            })
            .expect(HttpStatus.BadRequest_400);

        expect(getNewBlog2.body.errorsMessages).toBeInstanceOf(Array);
        expect(getNewBlog2.body.errorsMessages).toHaveLength(3);

        const getNewBlog3 = await request(app)
            .post(BLOGS_PATH)
            .send({
                ...correctBlogData,
                name: 'N',
            })
            .expect(HttpStatus.BadRequest_400);

        expect(getNewBlog3.body.errorsMessages).toBeInstanceOf(Array);
        expect(getNewBlog3.body.errorsMessages).toHaveLength(1);
    });

    it(`❌shouldn't update blog when incorrect body passed; POST /blogs/:id`, async () => {
        const { body: { id: idBlog } } = await request(app)
            .post(BLOGS_PATH)
            .send({ ...correctBlogData })
            .expect(HttpStatus.Created_201);

        const invalidDataSet1 = await request(app)
            .put(`${BLOGS_PATH}/${idBlog}`)
            .send({
                ...correctBlogData,
                name: '   ',
                description: '   ',
                websiteUrl: '   ',
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet1.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet1.body.errorsMessages).toHaveLength(3);

        const invalidDataSet2 = await request(app)
            .post(BLOGS_PATH)
            .send({
                ...correctBlogData,
                name: '',
                description: '',
                websiteUrl: 'Just site',
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet2.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet2.body.errorsMessages).toHaveLength(3);

        const invalidDataSet3 = await request(app)
            .post(BLOGS_PATH)
            .send({
                ...correctBlogData,
                name: 'N',
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet3.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet3.body.errorsMessages).toHaveLength(1);
    });
});
