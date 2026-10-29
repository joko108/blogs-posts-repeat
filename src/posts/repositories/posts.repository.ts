import { ObjectId, WithId } from "mongodb";
import { Post } from "../types/post";
import { postCollection } from "../../db/collections";
import { PostsForBlogQueryInput } from "../routers/input/post-query.input";

export const postsRepository = {
    async findMany(queryDto: PostsForBlogQueryInput): Promise<{ items: WithId<Post>[], totalCount: number }> {
        const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;

        const skip = (pageNumber - 1) * pageSize;

        const items = await postCollection
            .find()
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postCollection.countDocuments();

        return { items, totalCount };
    },
    
    async findById(id: string): Promise<WithId<Post> | null> {
        return postCollection.findOne({ _id: new ObjectId(id) });
    },
    
    async create(newPost: Post): Promise<string> {
        const insertResult = await postCollection.insertOne(newPost);
        return insertResult.insertedId.toString();
    },

    async update(id: string, post: Omit<Post, 'blogName' | 'createdAt'>): Promise<boolean> {
        const updateResult = await postCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: post },
        );
        return updateResult.matchedCount > 0;
    },

    async delete(id: string): Promise<boolean> {
        const deleteResult = await postCollection.deleteOne({ _id: new ObjectId(id) });
        return deleteResult.deletedCount > 0;
    },

    async findManyByBlogId(
        blogId: string, queryDto: PostsForBlogQueryInput
    ): Promise<{ items: WithId<Post>[], totalCount: number }> {

        const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;
        const skip = (pageNumber - 1) * pageSize;

        const filter = { blogId };

        const items = await postCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await postCollection.countDocuments(filter);

        return { items, totalCount };
    }
};
