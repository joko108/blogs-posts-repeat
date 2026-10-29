import { PostAttributes } from "../../../src/posts/attributes/dto/post.attributes";

export const getPostDto = (blogId: string): PostAttributes => {
    return {
        title: 'new post',
        shortDescription: 'some description',
        content: 'super content',
        blogId,
    };
};
