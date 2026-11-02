import { UserQueryInput } from "../routes/input/user-query.input";
import { ObjectId, WithId } from "mongodb";
import { User } from "../types/user";
import { userCollection } from "../../db/collections";

export const usersQueryRepository = {
    async findMany(queryDto: UserQueryInput): Promise<{ items: WithId<User>[]; totalCount: number }> {
        const {
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchLoginTerm,
            searchEmailTerm,
        } = queryDto;

        const skip = (pageNumber - 1) * pageSize;
        const filter: any = {};

        if (searchLoginTerm || searchEmailTerm) {
            filter.$or = [];
            if (searchLoginTerm) {
                filter.$or.push({
                    login: { $regex: searchLoginTerm, $options: 'i' },
                });
            }
            if (searchEmailTerm) {
                filter.$or.push({
                    email: { $regex: searchEmailTerm, $options: 'i' },
                });
            }
        }

        const items = await userCollection
            .find(filter)
            .sort({ [sortBy]: sortDirection })
            .skip(skip)
            .limit(pageSize)
            .toArray();

        const totalCount = await userCollection.countDocuments(filter);
        return { items, totalCount };
    },

    async findById(id: string): Promise<WithId<User> | null> {
        return userCollection.findOne({ _id: new ObjectId(id) });
    },
};
