import express from "express"
import {create} from "./racing-series/create"
import {getById} from "./racing-series/getById"

export class RacingSeriesController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }

    static async getById(req: express.Request, res: express.Response) {
        await getById(req, res)
    }
}
