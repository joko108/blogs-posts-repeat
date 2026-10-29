import { blogsRepository } from "../repositories/blogs.repository";
import { BlogQueryInput } from "../routers/input/blog-query.input";
import { WithId } from "mongodb";
import { Blog } from "../types/blog";
import { BlogsAttributes } from "./dtos/blogs-attributes";
import { DeleteResult, UpdateResult } from "../../core/types/update.delete.result";

export const blogsService = {
    async findMany(
        queryDto: BlogQueryInput
    ): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
        return blogsRepository.findMany(queryDto);
    },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogsRepository.findById(id);
    },

    async create(dto: BlogsAttributes): Promise<string> {
        // DTO -> domain model; 'cratedAt' and 'isMembership' adds here.
        const newBlog: Blog = {
            name: dto.name,
            description: dto.description,
            websiteUrl: dto.websiteUrl,
            createdAt: new Date(),
            isMembership: false,
        };
        return await blogsRepository.create(newBlog);
    },

    async update(id: string, dto: BlogsAttributes): Promise<UpdateResult> {
        const isUpdated = await blogsRepository.update(id, dto);
        return isUpdated ? { status: 'updated' } : { status: 'not found' };
    },

    async delete(id: string): Promise<DeleteResult> {
        const isDeleted = await blogsRepository.delete(id);
        return isDeleted ? { status: 'deleted' } : { status: 'not found' };
    },
};
