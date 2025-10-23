import express from "express"
import {create} from "./racing-series/create"

export class RacingSeriesController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
