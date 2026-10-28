import { WithId, ObjectId } from "mongodb";
import { Blog } from "../types/blog";
import { blogCollection } from "../../db/collections";
import { BlogQueryInput } from "../routers/input/blog-query.input";

export const blogsRepository = {
    async findMany(queryDto: BlogQueryInput): Promise<{ items: WithId<Blog>[]; totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchNameTerm) {
            filter.$or = [];
            filter.$or.push({ name: { $regex: searchNameTerm, $options: 'i' } });
        }

        const items = await blogCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await blogCollection.countDocuments(filter);

        return { items, totalCount };
    },

    async findById(id: string): Promise<WithId<Blog> | null> {
        return blogCollection.findOne({ _id: new ObjectId(id) });
    },

    // Accept the domain document and add the id.
    async create(newBlog: Blog): Promise<WithId<Blog>> {
        const insertResult = await blogCollection.insertOne(newBlog);
        return { ...newBlog, _id: insertResult.insertedId };
    },

    // Accept the domain document without 'createdAt', the mapper from handler adds it.
    // Return 'true' if blog is found and update, else 'false'.
    async update(
        id: string,
        blog: Omit<Blog, 'createdAt' | 'isMembership'>
    ): Promise<boolean> {
        const updateResult = await blogCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: blog },
        );
        return updateResult.matchedCount > 0;
    },

    // Return 'true' if blog is found and delete, else 'false'.
    async delete(id: string): Promise<boolean> {
        const deleteResult = await blogCollection.deleteOne({
            _id: new ObjectId(id),
        });

        return deleteResult.deletedCount > 0;
    },
};
