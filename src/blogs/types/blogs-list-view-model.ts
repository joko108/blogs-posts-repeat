import { BlogViewModel } from "./blog-view-model";
import { PaginatedOutput } from "../../core/types/paginated.output";

// Blogs list view-model for return via API.
export type BlogsListViewModel = PaginatedOutput & { items: BlogViewModel[] };
