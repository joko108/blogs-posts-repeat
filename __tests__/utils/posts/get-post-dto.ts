import { PostInputDto } from "../../../src/posts/dto/post.input.dto";

export const getPostDto = (blogId: string): PostInputDto => {
    return {
        title: 'new post',
        shortDescription: 'some description',
        content: 'super content',
        blogId,
    };
};
