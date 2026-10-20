import { Request, Response } from "express";
import { HttpStatus } from "../../../core/types/http-statuses";
import {getAllCollections} from "../../../db/collections";

// Clear DB (use on the e2e-tests before it start).
export const truncateDbHandler = async (_req: Request, res: Response) => {
    try {
        // Clear all collections (for tests).
        await Promise.all(
            getAllCollections().map((collection) => collection.deleteMany({})));

        res.sendStatus(HttpStatus.NoContent_204);
    } catch {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
};
