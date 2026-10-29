import { WithId } from "mongodb";
import { User } from "../../types/user";
import { UserViewModel } from "../../types/user-view-model";

export const mapToUserViewModel = (dto: WithId<User>): UserViewModel => {
    return {
        id: dto._id.toString(),
        login: dto.login,
        email: dto.email,
        createdAt: dto.createdAt,
    };
};
