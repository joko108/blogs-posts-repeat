import { Collection, Db } from "mongodb";
import { Blog } from "../blogs/types/blog";
import { Post } from "../posts/types/post";
import { User } from "../users/types/user";
import { Comment } from "../comments/types/comment";

// Names of the collections.
export const BLOG_COLLECTION_NAME = 'blogs';
export const POST_COLLECTION_NAME = 'posts';
export const USER_COLLECTION_NAME = 'users';
export const COMMENT_COLLECTION_NAME = 'comments';

// Define and classify collections before they are created.
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;
export let userCollection: Collection<User>;
export let commentsCollection: Collection<Comment>;

// Init collections.
export const initCollections = (db: Db): void => {
    blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<Post>(POST_COLLECTION_NAME);
    userCollection = db.collection<User>(USER_COLLECTION_NAME);
    commentsCollection = db.collection<Comment>(COMMENT_COLLECTION_NAME);

    // For check unique of values.
    userCollection.createIndex({ login: 1 }, { unique: true });
    userCollection.createIndex({ email: 1 }, { unique: true });
};

// Return all collections (for tests).
export const getAllCollections = (): Collection<any>[] => {
    return [blogCollection, postCollection, userCollection, commentsCollection];
};
