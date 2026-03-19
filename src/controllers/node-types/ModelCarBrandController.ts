import express from "express"
import {create} from "./model-car-brands/create"

export const ModelCarBrandController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },
}
