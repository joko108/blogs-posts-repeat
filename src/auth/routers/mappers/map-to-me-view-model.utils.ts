import { WithId } from "mongodb";
import { User } from "../../../users/types/user";
import { MeViewModel } from "../../types/me-view-model";

export const mapToMeViewModelUtils = (user: WithId<User>): MeViewModel => {
    return {
        email: user.email,
        login: user.login,
        userId: user._id.toString(),
    };
};
