import express from "express"
import {create} from "./model-cars/create"

export const ModelCarController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
