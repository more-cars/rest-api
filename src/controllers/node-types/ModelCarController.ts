import express from "express"
import {create} from "./model-cars/create"
import {getById} from "./model-cars/getById"

export const ModelCarController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
