import express from "express"
import {create} from "./prices/create"
import {getById} from "./prices/getById"

export const PriceController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
