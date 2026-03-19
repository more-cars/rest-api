import express from "express"
import {create} from "./prices/create"

export const PriceController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
