import { PostViewModel } from "./post-view-model";
import { PaginatedOutput } from "../../core/types/paginated.output";

// Posts list view-model for return via API.
export type PostsListViewModel = PaginatedOutput & { items: PostViewModel[] };
