import express from "express"
import {getById} from "./nodes/getById"

export const NodeController = {
    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
