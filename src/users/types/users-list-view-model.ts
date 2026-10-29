import { PaginatedOutput } from "../../core/types/paginated.output";
import { UserViewModel } from "./user-view-model";

// User's list view-model to return via API.
export type UsersListViewModel = PaginatedOutput & { items: UserViewModel[] };
