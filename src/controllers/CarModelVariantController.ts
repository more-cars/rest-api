import express from "express"
import {create} from "./car-model-variants/create"
import {getById} from "./car-model-variants/getById"

export class CarModelVariantController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }
}
