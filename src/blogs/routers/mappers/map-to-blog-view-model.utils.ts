import { WithId } from "mongodb";
import { Blog } from "../../types/blog";
import { BlogViewModel } from "../../types/blog-view-model";

// Transform document of blog from database to view-model for the answer via API.
// _id (ObjectId) -> string id, return only necessary fields to client.
export const mapToBlogViewModelUtils = (blog: WithId<Blog>): BlogViewModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership,
    };
};
