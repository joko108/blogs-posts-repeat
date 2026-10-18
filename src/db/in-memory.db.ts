import { Blog } from "../blogs/types/blog";
import { Post } from "../posts/types/post";

export const db = {
    blogs: <Blog[]>[
        {
            id: '1',
            name: 'Alex blog',
            description: 'Just Alex blog',
            websiteUrl: 'https://alex.blog.com',
        },
        {
            id: '2',
            name: 'Bob blog',
            description: 'Super Bob blog',
            websiteUrl: 'https://bob.blog.com',
        },
    ],
    posts: <Post[]>[],
};
