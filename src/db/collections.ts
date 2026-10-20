import { Collection, Db } from "mongodb";
import { Blog } from "../blogs/types/blog";
import { Post } from "../posts/types/post";

// Names of the collections.
export const BLOG_COLLECTION_NAME = 'blogs';
export const POST_COLLECTION_NAME = 'posts';

// Define and classify collections before they are created.
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;

// Init collections.
export const initCollections = (db: Db): void => {
    blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<Post>(POST_COLLECTION_NAME);
};

// Return all collections (for e2e-tests).
export const getAllCollections = (): Collection<any>[] => {
    return [blogCollection, postCollection];
};
