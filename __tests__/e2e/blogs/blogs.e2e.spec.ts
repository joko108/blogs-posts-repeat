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
import { createBlog } from "../../utils/drivers/create-blog";
import { getBlogById } from "../../utils/drivers/get-blog-by-id";
import { updateBlog } from "../../utils/drivers/update-blog";
import { generateBasicAuthToken } from "../../utils/generate-admin-auth-token";

describe('Blogs API Tests', () => {
    const app = express();
    setupApp(app);

    beforeAll(async () => {
        await runDB(SETTINGS.MONGO_URL);
        await clearDb(app);
    });

    afterAll(async () => {
        await stopDb();
    });

    it(`✅should create blog; POST /blogs`, async () => {
        const newBlog: BlogsInputDto = {
            ...getBlogDto(),
            name: 'Alex',
            websiteUrl: 'https://alexblog.com',
        };

        await createBlog(app, newBlog);
    });

    it(`✅should return blogs list; GET /blogs`, async () => {
        await createBlog(app);
        await createBlog(app);

        const getResponse = await request(app)
            .get(BLOGS_PATH)
            .expect(HttpStatus.Ok_200);

        expect(getResponse.body).toBeInstanceOf(Array);
        expect(getResponse.body.length).toBeGreaterThanOrEqual(2);
    });

    it(`✅should return blog by id; GET /blogs/:id`, async () => {
        const createdBlog = await createBlog(app);
        const blog = await getBlogById(app, createdBlog.id);

        expect(blog).toBeInstanceOf(Object);
        expect(blog).toEqual({
            ...createdBlog,
            id: expect.any(String),
            createdAt: expect.any(String),
            isMembership: expect.any(Boolean),
        });
    });

    it(`✅should update blog by id when correct body passed; PUT /blogs/:id`, async () => {
        const createdBlog = await createBlog(app);

        const blogUpdateData: BlogsInputDto = {
            name: 'Ann',
            description: 'Some description',
            websiteUrl: 'https://ann.superblog.com',
        };

        await updateBlog(app, createdBlog.id, blogUpdateData);

        const getUpdatedBlogResponse = await getBlogById(app, createdBlog.id);

        expect(getUpdatedBlogResponse).toEqual({
            id: createdBlog.id,
            name: blogUpdateData.name,
            description: blogUpdateData.description,
            websiteUrl: blogUpdateData.websiteUrl,
            createdAt: createdBlog.createdAt,
            isMembership: createdBlog.isMembership,
        });
    });

    it(`✅should delete blog by id; DELETE /blogs/:id`, async () => {
        const createdBlog = await createBlog(app);

        await request(app)
            .delete(`${BLOGS_PATH}/${createdBlog.id}`)
            .set('Authorization', generateBasicAuthToken())
            .expect(HttpStatus.NoContent_204);

        await request(app)
            .get(`${BLOGS_PATH}/${createdBlog.id}`)
            .expect(HttpStatus.NotFound_404);
    });
});
