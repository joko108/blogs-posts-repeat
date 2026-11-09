import { PaginationAndSorting } from "../../../core/types/pagination-and-sorting";
import { CommentsSortField } from "./comments-sort-field";

export type CommentsQueryInput = PaginationAndSorting<CommentsSortField>;
