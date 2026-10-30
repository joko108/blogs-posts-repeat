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
        // At first search existing login.
        const existingUserByLogin = await this.findByLogin(dto.login);
        if (existingUserByLogin) {
            throw new Error('Login already exists');
        }

        // At second search existing email.
        const existingUserByEmail = await this.findByEmail(dto.email);
        if (existingUserByEmail) {
            throw new Error('Email already exists');
        }

        const newUser: User = {
            login: dto.login,
            password: dto.password,
            email: dto.email,
            createdAt: new Date(),
        };
        return await usersRepository.create(newUser);
    },

    async delete(id: string): Promise<DeleteResult> {
        const isDeleted = await usersRepository.delete(id);
        return isDeleted ? { status: 'deleted' } : { status: 'not found' };
    },

    async findByLogin(login: string): Promise<WithId<User> | null> {
        return usersRepository.findByLogin(login);
    },

    async findByEmail(email: string): Promise<WithId<User> | null> {
        return usersRepository.findByEmail(email);
    },
};
