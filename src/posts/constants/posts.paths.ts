// Main rout.
export const POSTS_PATH = '/posts';

// Secondary sub-routes.
export const POSTS_ROUTES = {
    ROOT: '',
    BY_ID: '/:id',
    BY_ID_FOR_COMMENTS: '/:postId/comments',
} as const;
