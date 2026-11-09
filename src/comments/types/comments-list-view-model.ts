import { PaginatedOutput } from "../../core/types/paginated.output";
import { CommentViewModel } from "./comment-view-model";

export type CommentsListViewModel = PaginatedOutput & { items: CommentViewModel[] };
