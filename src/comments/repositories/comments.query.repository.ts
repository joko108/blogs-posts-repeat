import { CommentsQueryInput } from "../router/input/comments-query.input";
import { ObjectId, WithId } from "mongodb";
import { Comment } from "../types/comment";
import { commentsCollection } from "../../db/collections";

export const commentsQueryRepository = {
    async findManyByPostId(
        postId: string,
        queryDto: CommentsQueryInput
    ): Promise<{ items: WithId<Comment>[], totalCount: number }> {
        const { pageNumber, pageSize, sortBy, sortDirection } = queryDto;

        const skip = (pageNumber - 1) * pageSize;

        const filter = { postId };

        const items = await commentsCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await commentsCollection.countDocuments();

        return { items, totalCount };
    },

    async findById(id: string): Promise<WithId<Comment> | null> {
        return commentsCollection.findOne({ _id: new ObjectId(id) });
    },
};
