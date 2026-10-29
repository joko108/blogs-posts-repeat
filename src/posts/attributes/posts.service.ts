import { PostsForBlogQueryInput } from "../routers/input/post-query.input";
import { WithId } from "mongodb";
import { Post } from "../types/post";
import { postsRepository } from "../repositories/posts.repository";
import { PostInputDto } from "./dto/post.input.dto";
import { DeleteResult, UpdateResult } from "../../core/types/update.delete.result";
import { PostForBlogInputDto } from "./dto/post-for-blog.input.dto";

export const postsService = {
    async findMany(
        queryDto: PostsForBlogQueryInput
    ): Promise<{ items: WithId<Post>[], totalCount: number }> {
        return postsRepository.findMany(queryDto);
    },

    async findById(id: string): Promise<WithId<Post> | null> {
        return postsRepository.findById(id);
    },

    async create(dto: PostInputDto, blogName: string): Promise<string> {
        // DTO -> domain model; 'blogName and 'cratedAt' adds here.
        const newPost: Post = {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: dto.blogId,
            blogName: blogName,
            createdAt: new Date(),
        };
        return await postsRepository.create(newPost);
    },

    async createPostForBlog(dto: PostForBlogInputDto, blogId: string, blogName: string): Promise<string> {
        const newPostForBlog: Post = {
            title: dto.title,
            shortDescription: dto.shortDescription,
            content: dto.content,
            blogId: blogId,  // Add blog's ID.
            blogName: blogName,
            createdAt: new Date(),
        };
        return await postsRepository.create(newPostForBlog);
    },

    async update(id: string, dto: PostInputDto): Promise<UpdateResult> {
        const isUpdated = await postsRepository.update(id, dto);
        return isUpdated ? { status: 'updated' } : { status: 'not found' };
    },

    async delete(id: string): Promise<DeleteResult> {
        const isDeleted = await postsRepository.delete(id);
        return isDeleted ? { status: 'deleted' } : { status: 'not found' };
    },

    async findManyByBlogId(
        blogId: string, queryDto: PostsForBlogQueryInput
    ): Promise<{ items: WithId<Post>[], totalCount: number }> {
        return postsRepository.findManyByBlogId(blogId, queryDto);
    },
};
