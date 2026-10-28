// Main endpoint.
export const BLOGS_PATH = '/blogs';

// Secondary sub-routes.
export const BLOGS_ROUTES = {
    ROOT: '',
    BY_ID: '/:id',
    BY_ID_FOR_POSTS: '/:blogId/posts',
} as const;
