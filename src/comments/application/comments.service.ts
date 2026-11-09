import { CommentAttributes } from "./dto/comment.attributes";
import { Comment } from "../types/comment";
import { commentsRepository } from "../repositories/comments.repository";
import { DeleteResult, UpdateResult } from "../../core/types/update.delete.result";

export const commentsService = {
    async create(dto: CommentAttributes, userId: string, userLogin: string): Promise<string> {
        const newComment: Comment = {
            content: dto.content,
            userId: userId,
            userLogin: userLogin,
            createdAt: new Date(),
        };
        return await commentsRepository.create(newComment);
    },

    async update(id: string, dto: CommentAttributes): Promise<UpdateResult> {
        const isUpdated = await commentsRepository.update(id, dto);
        return isUpdated ? { status: 'updated' } : { status: 'not found' };
    },

    async delete(id: string): Promise<DeleteResult> {
        const isDeleted = await commentsRepository.delete(id);
        return isDeleted ? { status: 'deleted' } : { status: 'not found' };
    }
};
