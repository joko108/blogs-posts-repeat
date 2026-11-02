import { ObjectId, WithId } from "mongodb";
import { User } from "../types/user";
import { userCollection } from "../../db/collections";

export const usersRepository = {

    async findById(id: string): Promise<WithId<User> | null> {
        return userCollection.findOne({ _id: new ObjectId(id) });
    },

    async create(dto: User): Promise<string> {
        const insertResult = await userCollection.insertOne(dto);
        return insertResult.insertedId.toString();
    },

    async delete(id: string): Promise<boolean> {
        const deleteResult = await userCollection.deleteOne({
           _id: new ObjectId(id)
        });
        return deleteResult.deletedCount > 0;
    },

    async findByLoginOrEmail(loginOrEmail: string): Promise<WithId<User> | null> {
        return await userCollection.findOne({
            $or: [{ login: loginOrEmail }, { email: loginOrEmail }],
        });
    },

    async findByLogin(login: string): Promise<WithId<User> | null> {
        return await userCollection.findOne({ login });
    },

    async findByEmail(email: string): Promise<WithId<User> | null> {
        return await userCollection.findOne({ email });
    },
};
