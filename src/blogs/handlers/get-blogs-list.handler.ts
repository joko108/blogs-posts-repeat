import { Request, Response } from "express";
import { HttpStatus } from "../../core/types/http-statuses";
import {blogsRepository} from "../repositories/blogs.repository";

export const getBlogsListHandler = (req: Request, res: Response) => {
    res.sendStatus(HttpStatus.Ok_200).send(blogsRepository.findAll());
};
