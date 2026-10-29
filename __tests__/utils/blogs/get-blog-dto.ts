import { BlogsAttributes } from "../../../src/blogs/application/dtos/blogs-attributes";

export const getBlogDto = (): BlogsAttributes => {
    return {
        name: 'Valentin blog',
        description: 'Just own blog',
        websiteUrl: 'https://valentin.blog.com',
    };
};
