import { WithId } from "mongodb";
import { User } from "../../types/user";
import { UsersListViewModel } from "../../types/users-list-view-model";

export const mapToUsersListViewModelUtils = (
    items: WithId<User>[],
    meta: { pageNumber: number, pageSize: number, totalCount: number }
): UsersListViewModel => {
    return {
        pagesCount: Math.ceil(meta.totalCount / meta.pageSize),
        page: meta.pageNumber,
        pageSize: meta.pageSize,
        totalCount: meta.totalCount,
        items: items.map((item) => ({
            id: item._id.toString(),
            login: item.login,
            email: item.email,
            createdAt: item.createdAt,
        })),
    };
};
