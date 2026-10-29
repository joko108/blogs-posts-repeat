import { UserQueryInput } from "../routes/input/user-query.input";
import { WithId } from "mongodb";
import { User } from "../types/user";
import { usersRepository } from "../repositories/users.repository";
import { UsersAttributes } from "./dtos/users-attributes";
import { DeleteResult } from "../../core/types/update.delete.result";

export const usersService = {
    async findMany(
        queryDto: UserQueryInput
    ): Promise<{ items: WithId<User>[]; totalCount: number }> {
        return usersRepository.findMany(queryDto);
    },

    async findById(id: string): Promise<WithId<User> | null> {
        return usersRepository.findById(id);
    },

    async create(dto: UsersAttributes): Promise<string> {
        const newUser: User = {
            login: dto.login,
            email: dto.email,
            createdAt: new Date(),
        };
        return await usersRepository.create(newUser);
    },

    async delete(id: string): Promise<DeleteResult> {
        const isDeleted = await usersRepository.delete(id);
        return isDeleted ? { status: 'deleted' } : { status: 'not found' };
    },
};
