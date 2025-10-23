import express from "express"
import {create} from "./racing-events/create"

export class RacingEventController {
    static async create(req: express.Request, res: express.Response) {
        await create(req, res)
    }
}
