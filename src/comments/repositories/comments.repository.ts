import { Comment } from "../types/comment";
import { commentsCollection } from "../../db/collections";
import { CommentAttributes } from "../application/dto/comment.attributes";
import { ObjectId } from "mongodb";

export const commentsRepository = {
    async create(newComment: Comment): Promise<string> {
        const insertResult = await commentsCollection.insertOne(newComment);
        return insertResult.insertedId.toString();
    },

    async update(id: string, dto: CommentAttributes): Promise<boolean> {
        const isUpdated = await commentsCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: dto },
        );
        return isUpdated.matchedCount > 0;
    },

    async delete(id: string): Promise<boolean> {
        const isDeleted = await commentsCollection.deleteOne({ _id: new ObjectId(id) });
        return isDeleted.deletedCount > 0;
    }
};
