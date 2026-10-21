import { BlogsInputDto } from "../../../src/blogs/dto/blogs.input.dto";

export const getBlogDto = (): BlogsInputDto => {
    return {
        name: 'Valentin blog',
        description: 'Just own blog',
        websiteUrl: 'https://valentin.blog.com',
    };
};
