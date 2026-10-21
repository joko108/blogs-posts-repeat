import request from "supertest";
import express from "express";
import { setupApp } from "../../../src/setup-app";
import { BlogsInputDto } from "../../../src/blogs/dto/blogs.input.dto";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { BLOGS_PATH } from "../../../src/blogs/constants/blogs.paths";
import { runDB, stopDb } from "../../../src/db/mongo.db";
import { SETTINGS } from "../../../src/settings/config";
import { clearDb } from "../../utils/clear-db";
import { getBlogDto } from "../../utils/drivers/get-blog-dto";
import { generateBasicAuthToken } from "../../utils/generate-admin-auth-token";

describe('Blogs body validation tests', () => {
    const app = express();
    setupApp(app);

    const correctTestBlogData: BlogsInputDto = getBlogDto();

    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL);
        await clearDb(app);
    });

    afterAll(async () => {
        await stopDb();
    });

    it(`❌shouldn't create blog when incorrect body passed; POST /blogs`, async () => {
        await request(app)
            .post(BLOGS_PATH)
            .send(correctTestBlogData)
            .expect(HttpStatus.Unathorized_401);

        const invalidDataSet1 = await request(app)
            .post(BLOGS_PATH)
            .set('Authorization', generateBasicAuthToken())
            .send({
                ...correctTestBlogData,
                name: '   ',  // empty string
                description: '   ',  // empty string
                websiteUrl: '   ',  // empty string
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet1.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet1.body.errorsMessages).toHaveLength(3);

        const invalidDataSet2 = await request(app)
            .post(BLOGS_PATH)
            .set('Authorization', generateBasicAuthToken())
            .send({
                ...correctTestBlogData,
                name: '',  // empty string
                description: '',  // empty string
                websiteUrl: 'Just site',  // invalid URL
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet2.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet2.body.errorsMessages).toHaveLength(3);

        const invalidDataSet3 = await request(app)
            .post(BLOGS_PATH)
            .set('Authorization', generateBasicAuthToken())
            .send({
                ...correctTestBlogData,
                name: 'N',  // too short name
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet3.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet3.body.errorsMessages).toHaveLength(1);
    });

    it(`❌shouldn't update blog when incorrect body passed; POST /blogs/:id`, async () => {
        const { body: { id: idBlog } } = await request(app)
            .post(BLOGS_PATH)
            .set('Authorization', generateBasicAuthToken())
            .send({ ...correctTestBlogData })
            .expect(HttpStatus.Created_201);

        const invalidDataSet1 = await request(app)
            .put(`${BLOGS_PATH}/${idBlog}`)
            .set('Authorization', generateBasicAuthToken())
            .send({
                ...correctTestBlogData,
                name: '   ',
                description: '   ',
                websiteUrl: '   ',
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet1.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet1.body.errorsMessages).toHaveLength(3);

        const invalidDataSet2 = await request(app)
            .post(BLOGS_PATH)
            .set('Authorization', generateBasicAuthToken())
            .send({
                ...correctTestBlogData,
                name: '',
                description: '',
                websiteUrl: 'Just site',
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet2.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet2.body.errorsMessages).toHaveLength(3);

        const invalidDataSet3 = await request(app)
            .post(BLOGS_PATH)
            .set('Authorization', generateBasicAuthToken())
            .send({
                ...correctTestBlogData,
                name: 'N',
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet3.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet3.body.errorsMessages).toHaveLength(1);
    });
});
