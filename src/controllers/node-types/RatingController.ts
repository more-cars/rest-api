import express from "express"
import {create} from "./ratings/create"

export const RatingController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
