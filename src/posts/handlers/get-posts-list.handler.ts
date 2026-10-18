import { Request, Response } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import { postsRepository } from "../repositories/posts.repository";

export const getPostsListHandler = (_req: Request, res: Response) => {
    res.status(HttpStatus.Ok_200).send(postsRepository.findAll());
};
