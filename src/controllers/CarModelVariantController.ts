import express from "express"
import {create} from "./car-model-variants/create"

export class CarModelVariantController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
