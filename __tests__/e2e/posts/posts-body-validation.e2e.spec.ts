import request from "supertest";
import express from "express";
import { setupApp } from "../../../src/setup-app";
import { runDB, stopDb } from "../../../src/db/mongo.db";
import { SETTINGS } from "../../../src/settings/config";
import { clearDb } from "../../utils/clear-db";
import { POSTS_PATH } from "../../../src/posts/constants/posts.paths";
import { HttpStatus } from "../../../src/core/types/http-statuses";
import { generateBasicAuthToken } from "../../utils/generate-admin-auth-token";

describe('Posts API body validation check', () => {
    const app = express();
    setupApp(app);

    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL);
        await clearDb(app);
    });

    afterAll(async () => {
        await stopDb();
    });

    it(`❌shouldn't create post when incorrect body passed; POST /posts`, async () => {
        await request(app)
            .post(POSTS_PATH)
            .send({})
            .expect(HttpStatus.Unathorized_401);

        const invalidDataSet1 = await request(app)
            .post(POSTS_PATH)
            .set('Authorization', generateBasicAuthToken())
            .send({
                title: '   ',  // empty string
                shortDescription: '   ',  // empty string
                content: '   ',  // empty string
                blogId: 'id',  // not a MongoId type
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet1.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet1.body.errorsMessages).toHaveLength(4);

        const invalidDataSet2 = await request(app)
            .post(POSTS_PATH)
            .set('Authorization', generateBasicAuthToken())
            .send({
                title: '',  // empty string
                shortDescription: '',  // empty string
                content: '',  // empty string
                blogId: '',  // empty string
            })
            .expect(HttpStatus.BadRequest_400);

        expect(invalidDataSet2.body.errorsMessages).toBeInstanceOf(Array);
        expect(invalidDataSet2.body.errorsMessages).toHaveLength(4);

        const postsListResponse = await request(app).get(POSTS_PATH);

        expect(postsListResponse.body).toHaveLength(0);
    });
});
