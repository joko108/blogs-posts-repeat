import { Collection, Db } from "mongodb";
import { Blog } from "../blogs/types/blog";
import { Post } from "../posts/types/post";
import { User } from "../users/types/user";

// Names of the collections.
export const BLOG_COLLECTION_NAME = 'blogs';
export const POST_COLLECTION_NAME = 'posts';
export const USER_COLLECTION_NAME = 'users';

// Define and classify collections before they are created.
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;
export let userCollection: Collection<User>;

// Init collections.
export const initCollections = (db: Db): void => {
    blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<Post>(POST_COLLECTION_NAME);
    userCollection = db.collection<User>(USER_COLLECTION_NAME);

    // For check unique of values.
    userCollection.createIndex({ login: 1 }, { unique: true });
    userCollection.createIndex({ email: 1 }, { unique: true });
};

// Return all collections (for tests).
export const getAllCollections = (): Collection<any>[] => {
    return [blogCollection, postCollection, userCollection];
};
