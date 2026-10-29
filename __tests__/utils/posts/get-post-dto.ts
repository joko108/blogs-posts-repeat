import { PostInputDto } from "../../../src/posts/attributes/dto/post.input.dto";

export const getPostDto = (blogId: string): PostInputDto => {
    return {
        title: 'new post',
        shortDescription: 'some description',
        content: 'super content',
        blogId,
    };
};
