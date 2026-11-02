import { WithId } from "mongodb";
import { User } from "../types/user";
import { usersRepository } from "../repositories/users.repository";
import { UsersAttributes } from "./dtos/users-attributes";
import { DeleteResult } from "../../core/types/update.delete.result";
import { bcryptService } from "../../auth/adapters/bcrypt.service";

export const usersService = {
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

        const passwordHash = await bcryptService.generateHash(dto.password);

        const newUser: User = {
            login: dto.login,
            password: passwordHash,
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
