import express from "express"
import {create} from "./model-car-brands/create"
import {getById} from "./model-car-brands/getById"

export const ModelCarBrandController = {
    async create(req: express.Request, res: express.Response) {
        await create(req, res)
    },

    async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    },
}
